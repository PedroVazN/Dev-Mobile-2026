export const cores = {
  fundo: '#000000',
  fundoElevado: '#141414',
  barraNavegacao: '#1C1C1E',
  borda: '#3A3A3C',
  texto: '#FFFFFF',
  textoSecundario: '#AEAEB2',
  destaque: '#34C759',
  destaqueEscuro: '#248A3D',
};

export const tipografia = {
  titulo: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: cores.texto,
    letterSpacing: 0.3,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: cores.destaque,
  },
  corpo: {
    fontSize: 16,
    lineHeight: 24,
    color: cores.textoSecundario,
  },
  legenda: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: cores.textoSecundario,
  },
};
