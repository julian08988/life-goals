import { Text, View } from 'react-native';

import { colors, type } from '@/ui/theme';

export default function Index() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={[type.title, { color: colors.text }]}>Life Goals</Text>
    </View>
  );
}
