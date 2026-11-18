import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { spokenReason } from '@/content/methods';
import { todayISO } from '@/domain/dates';
import { selectTodayActions } from '@/store/selectors';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/ui/components/Button';
import { GoalRow } from '@/ui/components/GoalRow';
import { GuideLine } from '@/ui/components/GuideLine';
import { Screen } from '@/ui/components/Screen';
import { Text } from '@/ui/components/Text';
import { VoiceComposer } from '@/ui/components/VoiceComposer';
import { WhyThisStep } from '@/ui/components/WhyThisStep';
import { spacing } from '@/ui/theme';
import { useVoice } from '@/voice/useVoice';

/** Close of day: mark what got done, one sentence, no score. */
export default function CloseDayScreen() {
  const today = todayISO();
  const state = useAppStore();
  const day = state.days[today];
  const open = selectTodayActions(state, today);
  const [note, setNote] = useState(day?.closingNote ?? '');
  const sample = useCallback(() => 'I did the first two minutes and kept going.', []);
  const voice = useVoice({ onTranscript: setNote, sample });

  const spoken = `Close the day. Mark what got done. Then one sentence: what did you do today that the person in your scene would recognize? What stays open carries to tomorrow; that is a correction, not a penalty. ${spokenReason('morning.correction')}`;

  const finish = () => {
    state.closeDay(today, note.trim() || null);
    router.back();
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="label">CLOSE THE DAY</Text>
        <Button label="Leave" kind="ghost" compact onPress={() => router.back()} />
      </View>
      <GuideLine text={spoken} say={voice.say} speaking={voice.speaking} onStop={voice.hush} />
      <WhyThisStep step="morning.correction" />
      <View style={styles.list}>
        {open.length === 0 ? <Text variant="bodyMuted">Nothing open. Everything for today is done.</Text> : null}
        {open.map((t) => (
          <GoalRow
            key={t.action.id}
            text={t.action.text}
            detail={`for “${t.goals[0]?.text}”`}
            trailing={<Button label="Done" kind="secondary" compact onPress={() => state.setActionStatus(t.action.id, 'done')} />}
          />
        ))}
      </View>
      <VoiceComposer value={note} onChange={setNote} onSubmit={finish} mic={voice.mic} onMic={voice.toggleMic} submitLabel="Close the day" placeholder="One sentence." error={voice.error} />
      <Button label="Close without a note" kind="ghost" compact onPress={finish} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  list: { gap: spacing.sm, marginVertical: spacing.lg },
});
