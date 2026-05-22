import { FlatList, View, Text, StyleSheet } from 'react-native';
import CadaProduto from './Produto';
import Style from './estiloProd';
import { cores, tipografia } from '../../constants/theme';

export default function Index({ itens }: any) {
  return (
    <View style={Style.corFundo}>
      <Text style={styles.titulo}>{itens.titulo}</Text>
      <Text style={styles.subtitulo}>{itens.subtitulo}</Text>
      <FlatList
        data={itens.lista}
        renderItem={({ item }) => <CadaProduto produto={item} />}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    ...tipografia.titulo,
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitulo: {
    ...tipografia.corpo,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  lista: {
    paddingBottom: 24,
  },
});
