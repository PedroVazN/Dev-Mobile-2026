import { Alert, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { useApp } from '../../context/AppContext';
import { cores, espacamento, raio } from '../../constants/theme';

export function AdminStoresScreen() {
  const { state, approveStore, blockStore } = useApp();

  return (
    <Screen>
      <Text style={styles.title}>Gerenciar lojas</Text>
      {state.stores.map((store) => (
        <View key={store.id} style={styles.card}>
          <Text style={styles.name}>{store.name}</Text>
          <View style={styles.badges}>
            <Badge label={store.status} tone={store.status === 'approved' ? 'success' : store.status === 'pending' ? 'warning' : 'danger'} />
            <Badge label={store.subscriptionStatus} tone="neutral" />
          </View>
          <View style={styles.actions}>
            {store.status === 'pending' ? (
              <Button label="Aprovar" onPress={() => approveStore(store.id)} style={styles.btn} />
            ) : null}
            <Button
              label="Bloquear"
              variant="danger"
              onPress={() =>
                Alert.alert('Bloquear', 'Confirmar?', [
                  { text: 'Não', style: 'cancel' },
                  { text: 'Sim', onPress: () => blockStore(store.id) },
                ])
              }
              style={styles.btn}
            />
          </View>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '700', marginBottom: espacamento.md },
  card: {
    backgroundColor: cores.fundoCard,
    borderRadius: raio.lg,
    padding: espacamento.md,
    marginBottom: espacamento.sm,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  name: { fontSize: 17, fontWeight: '700' },
  badges: { flexDirection: 'row', gap: 8, marginVertical: 8 },
  actions: { flexDirection: 'row', gap: 8 },
  btn: { flex: 1, minHeight: 40 },
});
