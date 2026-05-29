import { StyleSheet, Text, View } from 'react-native';
import { cores, raio } from '../constants/theme';

type Props = { label: string; tone?: 'success' | 'warning' | 'neutral' | 'danger' };

export function Badge({ label, tone = 'neutral' }: Props) {
  return (
    <View style={[styles.badge, styles[tone]]}>
      <Text style={[styles.text, styles[`text_${tone}`]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: raio.pill,
    alignSelf: 'flex-start',
  },
  neutral: { backgroundColor: '#F1F5F9' },
  success: { backgroundColor: cores.sucessoLight },
  warning: { backgroundColor: '#FEF3C7' },
  danger: { backgroundColor: '#FEE2E2' },
  text: { fontSize: 11, fontWeight: '700' },
  text_neutral: { color: cores.textoSecundario },
  text_success: { color: '#047857' },
  text_warning: { color: '#B45309' },
  text_danger: { color: '#B91C1C' },
});
