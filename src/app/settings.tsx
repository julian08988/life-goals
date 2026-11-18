import { router } from 'expo-router';
import { StyleSheet, Switch, View } from 'react-native';

import { hasLLM, hasOpenAI } from '@/config/env';
import { buildSeed } from '@/domain/seed';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/ui/components/Button';
import { Screen } from '@/ui/components/Screen';
import { Text } from '@/ui/components/Text';
import { colors, spacing } from '@/ui/theme';

export default function SettingsScreen() {
  const settings = useAppStore((s) => s.settings);
  const updateSettings = useAppStore((s) => s.updateSettings);
  const replaceData = useAppStore((s) => s.replaceData);
  const resetAll = useAppStore((s) => s.resetAll);

  const toggleDemo = (on: boolean) => {
    if (on) {
      replaceData({
        ...buildSeed(),
        settings: { ...settings, demoMode: true, name: 'Sam' },
        interview: { step: 'closing', promptIndex: 0, completedAt: new Date().toISOString() },
      });
    } else {
      resetAll();
      router.replace('/interview');
    }
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="title">Settings</Text>
        <Button label="Done" kind="ghost" compact onPress={() => router.back()} />
      </View>

      <Row label="Guide speaks out loud" detail={hasOpenAI() ? 'OpenAI voice' : 'Device voice'}>
        <Switch value={settings.voiceOutput} onValueChange={(voiceOutput) => updateSettings({ voiceOutput })} trackColor={{ true: colors.accentDeep }} />
      </Row>
      <Row label="Self-talk layer" detail="Adds an optional inner-critic prompt to Morning Course. Off by default.">
        <Switch value={settings.selfTalkLayer} onValueChange={(selfTalkLayer) => updateSettings({ selfTalkLayer })} trackColor={{ true: colors.accentDeep }} />
      </Row>
      <Row label="Demo data" detail="Loads an invented sample hierarchy so every screen has content. Replaces your data.">
        <Switch value={settings.demoMode} onValueChange={toggleDemo} trackColor={{ true: colors.accentDeep }} />
      </Row>

      <View style={styles.block}>
        <Text variant="label">GUIDE</Text>
        <Text variant="small">
          Reasoning: {hasLLM() ? 'Anthropic (falls back to the rule-based guide on any error)' : 'rule-based MockGuide, offline'}.
          {'\n'}Speech-to-text: {hasOpenAI() ? 'OpenAI Whisper' : 'simulated (sample transcript)'}.
          {'\n'}Set keys in .env to change this. See RUNNING.md.
        </Text>
      </View>

      <View style={styles.block}>
        <Text variant="label">DATA</Text>
        <Text variant="small">Everything is stored on this device only.</Text>
        <Button
          label="Start over (deletes everything)"
          kind="secondary"
          compact
          onPress={() => {
            resetAll();
            router.replace('/interview');
          }}
        />
      </View>
    </Screen>
  );
}

function Row({ label, detail, children }: { label: string; detail: string; children: React.ReactNode }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text>{label}</Text>
        <Text variant="small">{detail}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.hairline },
  rowText: { flex: 1, gap: 4 },
  block: { gap: spacing.sm, marginTop: spacing.xl },
});
