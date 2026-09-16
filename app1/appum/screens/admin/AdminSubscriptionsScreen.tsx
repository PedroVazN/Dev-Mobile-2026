import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { useApp } from '../../context/AppContext';
import type { SubscriptionStatus } from '../../types';
import { cores, espacamento, raio } from '../../constants/theme';

export function AdminSubscriptionsScreen() {
  const { state, setSubscription } = useApp();

  const setStatus = (storeId: string, status: SubscriptionStatus) => {
    setSubscription(storeId, status);
  };

  return (
    <Screen>
      <Text style={styles.title}>Assinaturas</Text>
      <Text style={styles.hint}>Plano mensal demo: R$ 49,90/loja</Text>
      {state.stores.map((store) => (
        <View key={store.id} style={styles.card}>
          <Text style={styles.name}>{store.name}</Text>
          <Badge label={store.subscriptionStatus} />
          <View style={styles.row}>
            <Button label="Ativar" onPress={() => setStatus(store.id, 'active')} style={styles.btn} />
            <Button label="Vencida" variant="secondary" onPress={() => setStatus(store.id, 'expired')} style={styles.btn} />
            <Button label="Cancelar" variant="outline" onPress={() => setStatus(store.id, 'cancelled')} style={styles.btn} />
          </View>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '700' },
  hint: { color: cores.textoSecundario, marginBottom: espacamento.md },
  card: {
    backgroundColor: cores.fundoCard,
    padding: espacamento.md,
    borderRadius: raio.lg,
    marginBottom: espacamento.sm,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  name: { fontWeight: '700', marginBottom: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  btn: { minHeight: 36, paddingHorizontal: 8 },
});
