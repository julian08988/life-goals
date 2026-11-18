import { StyleSheet, View } from 'react-native';

import type { Goal } from '@/domain/types';
import { Chip } from '@/ui/components/Chip';
import { Text } from '@/ui/components/Text';
import { spacing } from '@/ui/theme';

interface ParentPickerProps {
  label: string;
  options: Goal[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

/** Step one of creating anything: choose what it serves. */
export function ParentPicker({ label, options, selectedId, onSelect }: ParentPickerProps) {
  return (
    <View style={styles.root}>
      <Text variant="label">{label.toUpperCase()}</Text>
      <View style={styles.wrap}>
        {options.map((goal) => (
          <Chip
            key={goal.id}
            label={goal.text}
            selected={goal.id === selectedId}
            onPress={() => onSelect(goal.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.sm },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
