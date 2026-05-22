import { StyleSheet } from 'react-native';
import { cores } from '../../constants/theme';

const estilosProd = StyleSheet.create({
  corFundo: {
    flex: 1,
    backgroundColor: cores.fundo,
    paddingBottom: 24,
    paddingTop: 48,
    paddingHorizontal: 8,
  },
  card: {
    width: '92%',
    marginVertical: 8,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.fundoElevado,
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default estilosProd;
