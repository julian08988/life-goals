import { Link, router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { formatLongDate, todayISO, weekStartOf } from '@/domain/dates';
import { selectDoneToday, selectTodayActions, selectWeekThread } from '@/store/selectors';
import { useAppStore } from '@/store/useAppStore';
import { ActionCard } from '@/ui/components/ActionCard';
import { Button } from '@/ui/components/Button';
import { Screen } from '@/ui/components/Screen';
import { Text } from '@/ui/components/Text';
import { colors, spacing } from '@/ui/theme';

/** Today. The heading, the actions that serve it, and the thread behind each one. */
export default function TodayScreen() {
  const today = todayISO();
  const state = useAppStore();
  const day = state.days[today] ?? null;
  const actions = selectTodayActions(state, today);
  const done = selectDoneToday(state, today);
  const week = selectWeekThread(state, today);
  const name = state.settings.name;

  const started = !!day?.startedAt;
  const closed = !!day?.closedAt;

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text variant="label">{formatLongDate(today).toUpperCase()}</Text>
          <Text variant="title">{name ? `${name}, today.` : 'Today.'}</Text>
        </View>
        <Link href="/settings" asChild>
          <Button label="Settings" kind="ghost" compact onPress={() => undefined} />
        </Link>
      </View>

      {week.length === 0 ? (
        <View style={styles.block}>
          <Text variant="heading">No priorities set for this week.</Text>
          <Text variant="bodyMuted">
            Pick three, each tied to a monthly goal. Actions without a goal do not get saved.
          </Text>
          <Button label="Set this week" onPress={() => router.push('/review')} />
        </View>
      ) : !started ? (
        <View style={styles.block}>
          <Text variant="heading">Start the day. Three minutes.</Text>
          <Text variant="bodyMuted">
            Hear two of your goals, name today’s one thing, plan around one obstacle.
          </Text>
          <Button label="Morning Course" onPress={() => router.push('/morning')} />
        </View>
      ) : (
        <View style={styles.block}>
          <Text variant="label">HEADING</Text>
          <Text variant="heading">{day?.heading ?? 'Set.'}</Text>
          {day?.firstStep ? <Text variant="small">First two minutes: {day.firstStep}</Text> : null}
          {day?.obstaclePlan ? <Text variant="small">{day.obstaclePlan}</Text> : null}
          {day?.correction ? <Text variant="small">Back on course: {day.correction}</Text> : null}
          {!closed ? (
            <Button label="Close the day" kind="secondary" compact onPress={() => router.push('/close-day')} style={styles.inline} />
          ) : (
            <Text variant="small" color={colors.accent}>Day closed.{day?.closingNote ? ` “${day.closingNote}”` : ''}</Text>
          )}
        </View>
      )}

      {actions.length > 0 ? (
        <View style={styles.list}>
          <Text variant="label">TODAY’S ACTIONS · TAP FOR THE THREAD</Text>
          {actions.map((t) => (
            <ActionCard
              key={t.action.id}
              thread={t}
              highlighted={day?.headingActionId === t.action.id}
              onDone={() => state.setActionStatus(t.action.id, 'done')}
              onTalk={() => router.push({ pathname: '/talk', params: { about: t.action.id } })}
            />
          ))}
        </View>
      ) : week.length > 0 ? (
        <View style={styles.block}>
          <Text variant="bodyMuted">Nothing open for today. Add an action under a priority in Week, or ask the guide what to work on now.</Text>
        </View>
      ) : null}

      {done.length > 0 ? (
        <View style={styles.list}>
          <Text variant="label">DONE TODAY</Text>
          {done.map((t) => (
            <Text key={t.action.id} variant="bodyMuted">
              {t.action.text}
            </Text>
          ))}
        </View>
      ) : null}

      {week.length > 0 ? (
        <Button label="Talk it through" kind="ghost" onPress={() => router.push('/talk')} />
      ) : null}
      <Text variant="small" color={colors.textFaint} style={styles.foot}>
        Week of {weekStartOf(today)}. No streaks. A missed day gets a correction, not a penalty.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: spacing.lg },
  headerText: { gap: 4, flex: 1 },
  block: { gap: spacing.sm, marginBottom: spacing.lg },
  inline: { alignSelf: 'flex-start', marginTop: spacing.sm },
  list: { gap: spacing.md, marginBottom: spacing.lg },
  foot: { marginTop: spacing.lg },
});
