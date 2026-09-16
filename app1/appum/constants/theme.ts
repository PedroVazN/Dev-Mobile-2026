import { Platform, ViewStyle } from 'react-native';

export const cores = {
  primary: '#5B4FE8',
  primaryDark: '#4338CA',
  primaryLight: '#EEF2FF',
  accent: '#F43F5E',
  accentLight: '#FFE4E6',
  secondary: '#06B6D4',
  fundo: '#F4F6FB',
  fundoElevado: '#FFFFFF',
  fundoCard: '#FFFFFF',
  barraNavegacao: '#FFFFFF',
  borda: '#E8ECF4',
  bordaSuave: '#F1F5F9',
  texto: '#0F172A',
  textoSecundario: '#64748B',
  textoInverso: '#FFFFFF',
  destaque: '#5B4FE8',
  sucesso: '#10B981',
  sucessoLight: '#D1FAE5',
  alerta: '#F59E0B',
  erro: '#EF4444',
  sombra: 'rgba(15, 23, 42, 0.06)',
  overlay: 'rgba(15, 23, 42, 0.45)',
};

export const espacamento = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const raio = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const tipografia = {
  titulo: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: cores.texto,
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: cores.texto,
  },
  corpo: {
    fontSize: 15,
    lineHeight: 22,
    color: cores.textoSecundario,
  },
  legenda: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: cores.textoSecundario,
  },
  botao: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: cores.textoInverso,
  },
};

export const sombra = {
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  } satisfies ViewStyle,
  suave: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  } satisfies ViewStyle,
  tabBar: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 12,
  } satisfies ViewStyle,
};

export const layout = {
  hitSlop: { top: 12, bottom: 12, left: 12, right: 12 },
  tabHeight: Platform.OS === 'ios' ? 88 : 68,
};
