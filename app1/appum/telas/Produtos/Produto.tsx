import { Platform, StyleSheet, Text, View } from 'react-native';

const cardShadow =
  Platform.OS === 'android'
    ? { elevation: 3 }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      };

export type ProdutoItem = {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
};

type ProdutoProps = {
  item: ProdutoItem;
};

export default function Produto({ item }: ProdutoProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.nome}
      </Text>
      <Text style={styles.cardDesc} numberOfLines={4}>
        {item.descricao}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    backgroundColor: '#1a1a1c',
    padding: 16,
    marginVertical: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.08)',
    ...cardShadow,
  },
  cardTitle: {
    color: '#f0f0f2',
    fontSize: 17,
    fontWeight: '600',
  },
  cardDesc: {
    color: '#a8a8b0',
    lineHeight: 20,
    fontSize: 14,
    marginTop: 8,
  },
});
