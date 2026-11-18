import { useLocalSearchParams } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, type ScrollViewInstance } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spokenReason } from '@/content/methods';
import type { ConversationTurn, FourQuestion, ProposedAction } from '@/domain/types';
import { QUESTION_LABEL } from '@/guide/prompts/talk';
import { buildGuideContext, useGuide } from '@/guide/useGuide';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/ui/components/Button';
import { Chip } from '@/ui/components/Chip';
import { Text } from '@/ui/components/Text';
import { VoiceComposer } from '@/ui/components/VoiceComposer';
import { WhyThisStep } from '@/ui/components/WhyThisStep';
import { colors, radius, spacing } from '@/ui/theme';
import { useVoice } from '@/voice/useVoice';

const QUESTIONS: FourQuestion[] = ['why', 'prioritize', 'stay_on_course', 'work_on_now'];

const OPENERS: Record<FourQuestion, string> = {
  why: 'Why am I doing this?',
  prioritize: 'I have a pile. Which first?',
  stay_on_course: 'I keep slipping on this. How do I stay on course?',
  work_on_now: 'I have 40 minutes. What do I work on now?',
};

/**
 * Talk It Through. The guide reads the whole hierarchy and answers one of the four
 * questions in the user's words. Every answer ends in a next action that can be added
 * to this week in one tap.
 */
export default function TalkScreen() {
  const { about } = useLocalSearchParams<{ about?: string }>();
  const insets = useSafeAreaInsets();
  const guide = useGuide();
  const state = useAppStore();
  const name = state.settings.name;

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [turns, setTurns] = useState<ConversationTurn[]>([]);
  const [draft, setDraft] = useState('');
  const [question, setQuestion] = useState<FourQuestion | null>(null);
  const [thinking, setThinking] = useState(false);
  const [added, setAdded] = useState<Record<string, string>>({});
  const scroll = useRef<ScrollViewInstance>(null);

  const sample = useCallback(() => OPENERS[question ?? 'work_on_now'], [question]);
  const voice = useVoice({ onTranscript: (t) => send(t), sample });

  const aboutAction = about ? state.actions[about] : null;
  const intro = aboutAction
    ? `About "${aboutAction.text}". Ask me why it is there, where it fits, or what to do with it now. ${spokenReason('talk.opening')}`
    : `Say what is on your mind${name ? `, ${name}` : ''}: stuck, scattered or doubting. I answer from your own goals and we end with one step. ${spokenReason('talk.opening')}`;

  const send = async (text: string) => {
    const userText = text.trim();
    if (!userText || thinking) return;
    setDraft('');
    const id = sessionId ?? state.startSession('talk');
    if (!sessionId) setSessionId(id);
    const userTurn: ConversationTurn = {
      id: `${Date.now()}-u`,
      role: 'user',
      text: userText,
      question,
      nextAction: null,
      citations: [],
      createdAt: new Date().toISOString(),
    };
    state.appendTurn(id, userTurn);
    setTurns((t) => [...t, userTurn]);
    setThinking(true);
    try {
      const prefixed = aboutAction && turns.length === 0 ? `Regarding the action "${aboutAction.text}": ${userText}` : userText;
      const answer = await guide.talk({
        context: buildGuideContext(),
        question,
        userText: prefixed,
        history: turns.map((t) => ({ role: t.role, text: t.text })),
      });
      const guideTurn: ConversationTurn = {
        id: `${Date.now()}-g`,
        role: 'guide',
        text: answer.text,
        question: answer.question,
        nextAction: answer.nextAction,
        citations: answer.citations,
        createdAt: new Date().toISOString(),
      };
      state.appendTurn(id, guideTurn);
      setTurns((t) => [...t, guideTurn]);
      setQuestion(null);
      voice.say(answer.text).catch(() => undefined);
    } finally {
      setThinking(false);
      requestAnimationFrame(() => scroll.current?.scrollToEnd({ animated: true }));
    }
  };

  const addToWeek = (turnId: string, proposed: ProposedAction) => {
    if (!proposed.weekGoalId) return;
    const action = state.addAction({ weekGoalId: proposed.weekGoalId, text: proposed.text, source: 'talk' });
    setAdded((a) => ({ ...a, [turnId]: action.id }));
  };

  const endSession = () => {
    if (sessionId) state.endSession(sessionId);
    setSessionId(null);
    setTurns([]);
    setQuestion(null);
    voice.hush().catch(() => undefined);
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top + spacing.md }]}>
      <ScrollView ref={scroll} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text variant="label">TALK IT THROUGH</Text>
          {turns.length > 0 ? <Button label="New talk" kind="ghost" compact onPress={endSession} /> : null}
        </View>
        {turns.length === 0 ? (
          <View style={styles.intro}>
            <Text variant="heading">{intro}</Text>
            <WhyThisStep step="talk.opening" />
          </View>
        ) : null}
        {turns.map((turn) => (
          <View key={turn.id} style={[styles.turn, turn.role === 'user' ? styles.userTurn : styles.guideTurn]}>
            {turn.role === 'guide' ? <Text variant="label">GUIDE</Text> : null}
            <Text color={turn.role === 'user' ? colors.textMuted : colors.text}>{turn.text}</Text>
            {turn.role === 'guide' && turn.citations.length > 0 ? (
              <View style={styles.citations}>
                {turn.citations.slice(0, 3).map((c, i) => (
                  <Text key={`${c.id}-${i}`} variant="small" color={colors.textFaint}>
                    “{c.quote}”
                  </Text>
                ))}
              </View>
            ) : null}
            {turn.role === 'guide' && turn.nextAction ? (
              <View style={styles.next}>
                <Text variant="label" color={colors.accent}>NEXT ACTION</Text>
                <Text>{turn.nextAction.text}</Text>
                {turn.nextAction.servesText ? <Text variant="small">for “{turn.nextAction.servesText}”</Text> : null}
                {added[turn.id] ? (
                  <Text variant="small" color={colors.accent}>Added to this week.</Text>
                ) : turn.nextAction.weekGoalId ? (
                  <Button label="Add to this week" compact onPress={() => addToWeek(turn.id, turn.nextAction!)} style={styles.addButton} />
                ) : (
                  <Text variant="small" color={colors.textFaint}>No weekly priority to attach this to yet.</Text>
                )}
              </View>
            ) : null}
          </View>
        ))}
        {thinking ? <Text variant="bodyMuted">Reading your goals…</Text> : null}
      </ScrollView>

      <View style={[styles.composer, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
        <View style={styles.chips}>
          {QUESTIONS.map((q) => (
            <Chip key={q} label={QUESTION_LABEL[q]} selected={question === q} onPress={() => {
              setQuestion(question === q ? null : q);
              if (question !== q && !draft) setDraft(OPENERS[q]);
            }} />
          ))}
        </View>
        <VoiceComposer
          value={draft}
          onChange={setDraft}
          onSubmit={() => send(draft)}
          mic={voice.mic}
          onMic={voice.toggleMic}
          submitLabel="Ask"
          multiline={false}
          placeholder="Say it."
          error={voice.error}
          busy={thinking}
        />
        {turns.length > 0 ? <WhyThisStep step="talk.closing" /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, gap: spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  intro: { gap: spacing.lg, paddingVertical: spacing.md },
  turn: { gap: spacing.sm, padding: spacing.md, borderRadius: radius.lg },
  userTurn: { alignSelf: 'flex-end', maxWidth: '88%', backgroundColor: colors.surface },
  guideTurn: { backgroundColor: 'transparent', borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline },
  citations: { gap: 2 },
  next: { gap: 4, paddingTop: spacing.sm, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.hairline },
  addButton: { alignSelf: 'flex-start', marginTop: spacing.xs },
  composer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
