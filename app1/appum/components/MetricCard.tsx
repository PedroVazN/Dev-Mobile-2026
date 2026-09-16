import { StyleSheet, Text, View } from 'react-native';
import { cores, raio, espacamento } from '../constants/theme';

type Props = { label: string; value: string | number };

export function MetricCard({ label, value }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: cores.fundoCard,
    borderRadius: raio.md,
    padding: espacamento.md,
    borderWidth: 1,
    borderColor: cores.borda,
    marginBottom: espacamento.sm,
  },
  value: { fontSize: 22, fontWeight: '800', color: cores.primary },
  label: { fontSize: 12, color: cores.textoSecundario, marginTop: 4 },
});
