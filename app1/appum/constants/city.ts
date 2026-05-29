/**
 * Vizzy — foco em São Caetano do Sul (apelido: Sanca)
 * Referências: CDL São Caetano, ABC Paulista, IDH entre os mais altos do país.
 */

export const CITY = {
  name: 'São Caetano do Sul',
  nickname: 'Sanca',
  state: 'SP',
  region: 'ABC Paulista',
  /** Centro da cidade (Praça dos Três Poderes / entorno) */
  center: {
    latitude: -23.6231,
    longitude: -46.5544,
  },
  tagline: 'Comércio local de Sanca na palma da mão',
  description:
    'Cidade compacta do ABC, com forte vocação em serviços, varejo no Centro e comércio de bairro em Barcelona, Olímpico, Cerâmica e Santa Paula.',
} as const;

export type BairroSC = {
  id: string;
  name: string;
  zone: string;
  latitude: number;
  longitude: number;
};

/** Bairros com coordenadas aproximadas para busca por distância */
export const BAIRROS_SANCA: BairroSC[] = [
  {
    id: 'centro',
    name: 'Centro',
    zone: 'Varejo e serviços financeiros',
    latitude: -23.6228,
    longitude: -46.5542,
  },
  {
    id: 'santa-paula',
    name: 'Santa Paula',
    zone: 'Serviços, tecnologia e MEIs',
    latitude: -23.6285,
    longitude: -46.5678,
  },
  {
    id: 'ceramica',
    name: 'Cerâmica',
    zone: 'Distrito corporativo e industrial',
    latitude: -23.6148,
    longitude: -46.5485,
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    zone: 'Comércio local e logística',
    latitude: -23.6342,
    longitude: -46.5598,
  },
  {
    id: 'olimpico',
    name: 'Olímpico',
    zone: 'Comércio de bairro',
    latitude: -23.6395,
    longitude: -46.5562,
  },
  {
    id: 'sao-jose',
    name: 'São José',
    zone: 'Residencial e comércio de proximidade',
    latitude: -23.6185,
    longitude: -46.5625,
  },
  {
    id: 'fundacao',
    name: 'Fundação',
    zone: 'Comércio e serviços',
    latitude: -23.6268,
    longitude: -46.5412,
  },
];

export const PONTOS_REFERENCIA = [
  'ParkShopping São Caetano',
  'Teatro Paulo Machado de Carvalho',
  'Espaço Verde Chico Mendes',
  'Avenida Presidente Kennedy (Rua de Lazer)',
  'Esplanada da Estação São Caetano (CPTM)',
] as const;

export const defaultUserLocation = {
  latitude: CITY.center.latitude,
  longitude: CITY.center.longitude,
  label: `Centro, ${CITY.name} (${CITY.nickname})`,
};
