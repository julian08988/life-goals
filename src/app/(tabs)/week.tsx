import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { addDays, formatWeekRange, todayISO, weekStartOf } from '@/domain/dates';
import { selectOrphans, selectWeekThread } from '@/store/selectors';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/ui/components/Button';
import { GoalRow } from '@/ui/components/GoalRow';
import { Input } from '@/ui/components/Input';
import { Screen } from '@/ui/components/Screen';
import { Text } from '@/ui/components/Text';
import { ThreadView } from '@/ui/components/ThreadView';
import { colors, radius, spacing } from '@/ui/theme';

/** Week Weave: this week's priorities, each with its thread up to the scene sentence. */
export default function WeekScreen() {
  const today = todayISO();
  const weekStart = weekStartOf(today);
  const state = useAppStore();
  const slots = selectWeekThread(state, today);
  const orphans = selectOrphans(state, weekStart);
  const lastWeek = Object.values(state.goals)
    .filter((g) => g.level === 'week' && g.weekStart === addDays(weekStart, -7))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const [openId, setOpenId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text variant="label">WEEK OF {formatWeekRange(weekStart).toUpperCase()}</Text>
          <Text variant="title">This week’s thread.</Text>
        </View>
        <Button label="Review" kind="ghost" compact onPress={() => router.push('/review')} />
      </View>

      {slots.length === 0 ? (
        <View style={styles.block}>
          <Text variant="bodyMuted">No priorities yet. Three, each tied to a monthly goal.</Text>
          <Button label="Set this week" onPress={() => router.push('/review')} />
        </View>
      ) : null}

      {slots.map((slot) => {
        const open = openId === slot.priority.id;
        return (
          <View key={slot.priority.id} style={styles.slot}>
            <GoalRow
              text={slot.priority.text}
              detail={[slot.thread.goals[1] ? `for “${slot.thread.goals[1].text}”` : null, slot.priority.ifThen].filter(Boolean).join(' · ')}
              onPress={() => setOpenId(open ? null : slot.priority.id)}
            />
            {open ? (
              <View style={styles.detail}>
                <ThreadView thread={slot.thread} skipFirst />
                <Text variant="label">ACTIONS</Text>
                {slot.actions.map((a) => (
                  <View key={a.id} style={styles.actionRow}>
                    <Text variant="small" color={a.status === 'open' ? colors.text : colors.textFaint} style={styles.actionText}>
                      {a.text}
                      {a.dueDate ? ` · ${a.dueDate.slice(5)}` : ''}
                      {a.status !== 'open' ? ` · ${a.status}` : ''}
                    </Text>
                    {a.status === 'open' ? <Button label="Done" kind="ghost" compact onPress={() => state.setActionStatus(a.id, 'done')} /> : null}
                  </View>
                ))}
                <View style={styles.add}>
                  <Input
                    value={drafts[slot.priority.id] ?? ''}
                    onChangeText={(t) => setDrafts((d) => ({ ...d, [slot.priority.id]: t }))}
                    placeholder="Add an action under this priority"
                    multiline={false}
                    style={styles.addInput}
                  />
                  <Button
                    label="Add"
                    compact
                    disabled={!(drafts[slot.priority.id] ?? '').trim()}
                    onPress={() => {
                      state.addAction({ weekGoalId: slot.priority.id, text: drafts[slot.priority.id], source: 'manual' });
                      setDrafts((d) => ({ ...d, [slot.priority.id]: '' }));
                    }}
                  />
                </View>
              </View>
            ) : null}
          </View>
        );
      })}

      {orphans.length > 0 ? (
        <Text variant="small" color={colors.textMuted}>
          {orphans.length} item{orphans.length > 1 ? 's' : ''} without a thread. Open Review to re-thread.
        </Text>
      ) : null}

      {lastWeek.length > 0 ? (
        <View style={styles.block}>
          <Text variant="label">LAST WEEK</Text>
          {lastWeek.map((g) => (
            <Text key={g.id} variant="small">
              {g.status}: {g.text}
            </Text>
          ))}
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.lg },
  headerText: { gap: 4, flex: 1 },
  block: { gap: spacing.sm, marginVertical: spacing.lg },
  slot: { gap: spacing.sm, marginBottom: spacing.md },
  detail: {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  actionText: { flex: 1 },
  add: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  addInput: { flex: 1 },
});
