import { Alert, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { useApp } from '../../context/AppContext';
import { cores, espacamento, tipografia } from '../../constants/theme';

export function ProfileScreen() {
  const { currentUser, logout, state } = useApp();

  const favorites = state.stores.filter((s) =>
    currentUser?.favoriteStoreIds.includes(s.id)
  );

  return (
    <Screen>
      <Text style={styles.title}>Meu perfil</Text>
      <View style={styles.card}>
        <Text style={styles.name}>{currentUser?.name}</Text>
        <Text style={styles.meta}>{currentUser?.email}</Text>
        {currentUser?.phone ? (
          <Text style={styles.meta}>{currentUser.phone}</Text>
        ) : null}
      </View>

      <Text style={styles.section}>Lojas favoritas ({favorites.length})</Text>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>Você ainda não favoritou lojas.</Text>
      ) : (
        favorites.map((s) => (
          <Text key={s.id} style={styles.fav}>
            • {s.name}
          </Text>
        ))
      )}

      <Text style={styles.section}>Interesses (IA)</Text>
      <Text style={styles.empty}>
        {currentUser?.interests
          .map((id) => state.categories.find((c) => c.id === id)?.name)
          .filter(Boolean)
          .join(', ') || 'Nenhum definido'}
      </Text>

      <Button
        label="Sair da conta"
        variant="outline"
        onPress={() =>
          Alert.alert('Sair', 'Deseja sair?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Sair', onPress: () => logout() },
          ])
        }
        style={{ marginTop: espacamento.lg }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...tipografia.titulo, marginBottom: espacamento.md },
  card: {
    backgroundColor: cores.fundoCard,
    padding: espacamento.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cores.borda,
    marginBottom: espacamento.lg,
  },
  name: { fontSize: 20, fontWeight: '700', color: cores.texto },
  meta: { color: cores.textoSecundario, marginTop: 4 },
  section: { ...tipografia.subtitulo, marginBottom: 8 },
  empty: { ...tipografia.corpo, marginBottom: espacamento.lg },
  fav: { fontSize: 15, color: cores.texto, marginBottom: 4 },
});
