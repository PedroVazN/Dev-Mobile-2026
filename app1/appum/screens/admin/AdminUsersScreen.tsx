import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { useApp } from '../../context/AppContext';
import { cores, espacamento, raio } from '../../constants/theme';

export function AdminUsersScreen() {
  const { state } = useApp();
  const users = state.users.filter((u) => u.role !== 'admin');

  return (
    <Screen>
      <Text style={styles.title}>Usuários e lojistas</Text>
      {users.map((u) => (
        <View key={u.id} style={styles.row}>
          <Text style={styles.name}>{u.name}</Text>
          <Text style={styles.meta}>{u.email}</Text>
          <Text style={styles.role}>{u.role === 'consumer' ? 'Consumidor' : 'Loja'}</Text>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '700', marginBottom: espacamento.md },
  row: {
    backgroundColor: cores.fundoCard,
    padding: espacamento.md,
    borderRadius: raio.md,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  name: { fontWeight: '700', fontSize: 16 },
  meta: { color: cores.textoSecundario, marginTop: 2 },
  role: { color: cores.primary, fontWeight: '600', marginTop: 4, fontSize: 12 },
});
