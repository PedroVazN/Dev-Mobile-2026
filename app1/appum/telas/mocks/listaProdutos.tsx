import type { ProdutoItem } from '../Produtos/Produto';

const itens: ProdutoItem[] = [
  {
    id: 1,
    nome: 'Bola de futebol',
    descricao: 'Bola de futebol oficial da Copa do Mundo 2026',
    imagem: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    nome: 'Bola de basquete',
    descricao: 'Bola de basquete oficial da NBA',
    imagem: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    nome: 'Bola de vôlei',
    descricao: 'Bola de vôlei oficial da Liga das Nações',
    imagem: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    nome: 'Bola de tênis',
    descricao: 'Bola de tênis oficial da ATP',
    imagem: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    nome: 'Bola de futebol americano',
    descricao: 'Bola de futebol americano oficial da NFL',
    imagem: 'https://via.placeholder.com/150',
  },
];

export const listaProdutos = { itens };
export default listaProdutos;
