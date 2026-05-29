import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useApp } from '../../context/AppContext';
import { cores, espacamento, raio } from '../../constants/theme';

export function AdminCategoriesScreen() {
  const { state, addCategory, logout } = useApp();
  const [name, setName] = useState('');

  return (
    <Screen>
      <Text style={styles.title}>Categorias</Text>
      <Input label="Nova categoria" value={name} onChangeText={setName} />
      <Button
        label="Adicionar"
        onPress={async () => {
          if (!name.trim()) return;
          await addCategory(name.trim(), 'pricetag');
          setName('');
          Alert.alert('Categoria criada');
        }}
        style={{ marginBottom: espacamento.lg }}
      />
      {state.categories.map((c) => (
        <View key={c.id} style={styles.row}>
          <Text style={styles.name}>{c.name}</Text>
        </View>
      ))}
      <Button label="Sair admin" variant="outline" onPress={() => logout()} style={{ marginTop: 24 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '700', marginBottom: espacamento.md },
  row: {
    padding: espacamento.md,
    backgroundColor: cores.fundoCard,
    borderRadius: raio.md,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  name: { fontSize: 16, fontWeight: '600' },
});
