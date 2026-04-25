import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { ProdutoItem } from './Produto';
import Produto from './Produto';

const accent = '#8cb4ff';

type TelaProdutoProps = {
  itens: ProdutoItem[];
};

export default function TelaProduto({ itens }: TelaProdutoProps) {
  return (
    <View style={styles.root}>
      <FlatList
        data={itens}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Produto item={item} />}
        contentContainerStyle={styles.listContent}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Produtos</Text>
            <Text style={styles.subtitle}>
              {itens.length}{' '}
              {itens.length === 1 ? 'artigo' : 'artigos'} no catálogo
            </Text>
            <View style={[styles.titleRule, { backgroundColor: accent }]} />
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingTop: 4,
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  header: {
    marginBottom: 8,
    paddingTop: 4,
  },
  title: {
    color: '#f5f5f5',
    fontSize: 24,
    letterSpacing: 0.3,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 6,
    color: '#b0b0b8',
    fontSize: 15,
  },
  titleRule: {
    height: 3,
    width: 48,
    borderRadius: 2,
    marginTop: 14,
  },
  separator: {
    height: 12,
  },
});
