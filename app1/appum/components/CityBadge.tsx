import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CITY } from '../constants/city';
import { cores, raio, espacamento } from '../constants/theme';

export function CityBadge({ compact }: { compact?: boolean }) {
  return (
    <View style={[styles.wrap, compact && styles.compact]}>
      <Ionicons name="location" size={compact ? 14 : 16} color={cores.primary} />
      <Text style={[styles.text, compact && styles.textCompact]}>
        {CITY.nickname} · {CITY.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: cores.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: raio.pill,
    marginBottom: espacamento.sm,
  },
  compact: { marginBottom: 0, paddingVertical: 4 },
  text: { fontSize: 13, fontWeight: '700', color: cores.primaryDark },
  textCompact: { fontSize: 11 },
});
