const lista_produto = {
  itens: {
    titulo: 'Catálogo',
    subtitulo: 'Modelos disponíveis para treino e competição',
    lista: [
      {
        id: 1,
        nome: 'Bola de futebol — Campo',
        descricao: 'Costura reforçada, pressão padrão FIFA. Indicada para gramado natural e sintético.',
        preco: 189.9,
        imagem: require('../../assets/bola.png'),
      },
      {
        id: 2,
        nome: 'Bola de basquete — Indoor',
        descricao: 'Superfície em couro sintético com excelente grip em quadras cobertas.',
        preco: 249.0,
        imagem: require('../../assets/bola.png'),
      },
      {
        id: 3,
        nome: 'Bola de vôlei — Oficial',
        descricao: 'Leve e balanceada para recepção, levantamento e ataque em alto nível.',
        preco: 159.9,
        imagem: require('../../assets/bola.png'),
      },
      {
        id: 4,
        nome: 'Bola promocional — Edição limitada',
        descricao: 'Lote especial com acabamento premium. Consulte disponibilidade.',
        preco: 0,
        imagem: require('../../assets/bola.png'),
      },
    ],
  },
};

export default lista_produto;
