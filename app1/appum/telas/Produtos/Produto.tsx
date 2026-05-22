import { StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';
import Style from './estiloProd';
import { cores, tipografia } from '../../constants/theme';

export default function Produto({ produto: { nome, imagem, descricao, preco } }: any) {
  return (
    <Card mode="elevated" style={Style.card}>
      <Card.Cover source={imagem} style={styles.capa} />
      <Card.Content style={styles.conteudo}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.descricao}>{descricao}</Text>
        {preco != null && (
          <Text style={styles.preco}>
            {preco === 0 ? 'Sob consulta' : `R$ ${preco.toFixed(2).replace('.', ',')}`}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  capa: {
    backgroundColor: cores.fundoElevado,
  },
  conteudo: {
    paddingTop: 14,
  },
  nome: {
    ...tipografia.subtitulo,
    fontSize: 18,
    marginBottom: 6,
  },
  descricao: {
    ...tipografia.corpo,
    fontSize: 14,
    lineHeight: 20,
  },
  preco: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
    color: cores.destaque,
  },
});
