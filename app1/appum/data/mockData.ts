import type {
  AppState,
  Category,
  Coupon,
  Promotion,
  Store,
  User,
  ChatThread,
  ChatMessage,
} from '../types';
import {
  IMAGES,
  coverForCategory,
  promoImageForTitle,
  normalizeImageRef,
  type ImageKey,
} from '../constants/images';
import { defaultUserLocation } from '../constants/city';

const now = new Date();
const daysFromNow = (days: number) =>
  new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString();
const daysAgo = (days: number) =>
  new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

export const defaultCategories: Category[] = [
  { id: 'cat-food', name: 'Alimentação', icon: 'restaurant' },
  { id: 'cat-fashion', name: 'Moda', icon: 'shirt' },
  { id: 'cat-beauty', name: 'Beleza', icon: 'sparkles' },
  { id: 'cat-services', name: 'Serviços', icon: 'construct' },
  { id: 'cat-market', name: 'Mercado', icon: 'cart' },
  { id: 'cat-pets', name: 'Pet Shop', icon: 'paw' },
];

export const seedUsers: User[] = [
  {
    id: 'user-1',
    name: 'Ana Silva',
    email: 'ana@email.com',
    phone: '11999990001',
    role: 'consumer',
    interests: ['cat-food', 'cat-market'],
    favoriteStoreIds: ['store-1'],
    createdAt: daysAgo(30),
  },
  {
    id: 'user-store-1',
    name: 'Carlos Mendes',
    email: 'loja@padaria.com',
    phone: '11988880002',
    role: 'store',
    storeId: 'store-1',
    interests: [],
    favoriteStoreIds: [],
    createdAt: daysAgo(60),
  },
  {
    id: 'user-store-2',
    name: 'Marina Costa',
    email: 'loja@beleza.com',
    phone: '11977770003',
    role: 'store',
    storeId: 'store-2',
    interests: [],
    favoriteStoreIds: [],
    createdAt: daysAgo(45),
  },
  {
    id: 'user-store-3',
    name: 'João Barcelona',
    email: 'loja@mercado.com',
    phone: '11966660004',
    role: 'store',
    storeId: 'store-3',
    interests: [],
    favoriteStoreIds: [],
    createdAt: daysAgo(20),
  },
  {
    id: 'admin-1',
    name: 'Admin Vizzy Sanca',
    email: 'admin@vizzy.com',
    role: 'admin',
    interests: [],
    favoriteStoreIds: [],
    createdAt: daysAgo(90),
  },
];

export const seedStores: Store[] = [
  {
    id: 'store-1',
    ownerId: 'user-store-1',
    name: 'Padaria Pão de Sanca',
    description:
      'Padaria artesanal no Centro de São Caetano. Café da manhã, salgados e bolos para o bairro.',
    categoryId: 'cat-food',
    logo: IMAGES.bakery as ImageKey,
    coverImage: IMAGES.coffee as ImageKey,
    address: 'Rua Manoel Coelho, 380 - Centro, São Caetano do Sul',
    phone: '1142281001',
    whatsapp: '5511988880002',
    hours: 'Seg-Sáb 6h às 20h',
    latitude: -23.6225,
    longitude: -46.5538,
    status: 'approved',
    subscriptionStatus: 'active',
    subscriptionExpiresAt: daysFromNow(25),
    metrics: {
      profileViews: 412,
      clicks: 102,
      couponsRedeemed: 31,
      messagesReceived: 22,
    },
    createdAt: daysAgo(60),
  },
  {
    id: 'store-2',
    ownerId: 'user-store-2',
    name: 'Studio Marina — Santa Paula',
    description:
      'Salão e estética em Santa Paula. Cabelo, unhas e sobrancelha com horário marcado.',
    categoryId: 'cat-beauty',
    logo: IMAGES.salon as ImageKey,
    coverImage: IMAGES.salon as ImageKey,
    address: 'Rua Amazonas, 512 - Santa Paula, São Caetano do Sul',
    phone: '1142282002',
    whatsapp: '5511977770003',
    hours: 'Ter-Sáb 9h às 19h',
    latitude: -23.6282,
    longitude: -46.5672,
    status: 'approved',
    subscriptionStatus: 'active',
    subscriptionExpiresAt: daysFromNow(12),
    metrics: {
      profileViews: 268,
      clicks: 74,
      couponsRedeemed: 14,
      messagesReceived: 11,
    },
    createdAt: daysAgo(45),
  },
  {
    id: 'store-3',
    ownerId: 'user-store-3',
    name: 'Mercado Barcelona Fresh',
    description:
      'Hortifruti, mercearia e produtos frescos para famílias do bairro Barcelona.',
    categoryId: 'cat-market',
    logo: IMAGES.market as ImageKey,
    coverImage: IMAGES.market as ImageKey,
    address: 'Rua Barcelona, 890 - Barcelona, São Caetano do Sul',
    phone: '1142283003',
    whatsapp: '5511966660004',
    hours: 'Todos os dias 7h às 22h',
    latitude: -23.6338,
    longitude: -46.5592,
    status: 'approved',
    subscriptionStatus: 'active',
    subscriptionExpiresAt: daysFromNow(18),
    metrics: {
      profileViews: 195,
      clicks: 48,
      couponsRedeemed: 9,
      messagesReceived: 7,
    },
    createdAt: daysAgo(20),
  },
  {
    id: 'store-5',
    ownerId: 'user-store-5',
    name: 'Café Cerâmica Express',
    description:
      'Cafeteria rápida perto do polo empresarial da Cerâmica. Lanches e espresso para o expediente.',
    categoryId: 'cat-food',
    logo: IMAGES.coffee as ImageKey,
    coverImage: IMAGES.coffee as ImageKey,
    address: 'Av. Industrial, 1200 - Cerâmica, São Caetano do Sul',
    phone: '1142285005',
    whatsapp: '5511955551005',
    hours: 'Seg-Sex 7h às 18h',
    latitude: -23.6152,
    longitude: -46.549,
    status: 'approved',
    subscriptionStatus: 'active',
    subscriptionExpiresAt: daysFromNow(20),
    metrics: {
      profileViews: 156,
      clicks: 41,
      couponsRedeemed: 8,
      messagesReceived: 5,
    },
    createdAt: daysAgo(35),
  },
  {
    id: 'store-6',
    ownerId: 'user-store-6',
    name: 'Burger Olímpico',
    description:
      'Hambúrguer artesanal no bairro Olímpico. Delivery para Sanca e região do ABC.',
    categoryId: 'cat-food',
    logo: IMAGES.bakery as ImageKey,
    coverImage: IMAGES.coffee as ImageKey,
    address: 'Rua Olímpico, 245 - Olímpico, São Caetano do Sul',
    phone: '1142286006',
    whatsapp: '5511944446006',
    hours: 'Ter-Dom 18h às 23h',
    latitude: -23.639,
    longitude: -46.5558,
    status: 'approved',
    subscriptionStatus: 'active',
    subscriptionExpiresAt: daysFromNow(15),
    metrics: {
      profileViews: 302,
      clicks: 88,
      couponsRedeemed: 19,
      messagesReceived: 14,
    },
    createdAt: daysAgo(40),
  },
  {
    id: 'store-7',
    ownerId: 'user-store-7',
    name: 'Pet Sanca — São José',
    description: 'Ração, banho e tosa para pets. Atendimento agendado no São José.',
    categoryId: 'cat-pets',
    logo: IMAGES.pets as ImageKey,
    coverImage: IMAGES.pets as ImageKey,
    address: 'Rua São José, 78 - São José, São Caetano do Sul',
    phone: '1142287007',
    whatsapp: '5511933337007',
    hours: 'Seg-Sáb 8h às 18h',
    latitude: -23.6188,
    longitude: -46.5618,
    status: 'approved',
    subscriptionStatus: 'active',
    subscriptionExpiresAt: daysFromNow(22),
    metrics: {
      profileViews: 124,
      clicks: 35,
      couponsRedeemed: 6,
      messagesReceived: 4,
    },
    createdAt: daysAgo(25),
  },
  {
    id: 'store-4',
    ownerId: 'user-expired',
    name: 'Moda Fundação SC',
    description:
      'Moda feminina e masculina na Fundação. Assinatura pausada — exemplo de loja fora do ar.',
    categoryId: 'cat-fashion',
    logo: IMAGES.fashion as ImageKey,
    coverImage: IMAGES.fashion as ImageKey,
    address: 'Rua Conde de Frontin, 55 - Fundação, São Caetano do Sul',
    phone: '1142284004',
    whatsapp: '5511922224004',
    hours: 'Seg-Sex 10h às 18h',
    latitude: -23.6265,
    longitude: -46.5408,
    status: 'approved',
    subscriptionStatus: 'expired',
    subscriptionExpiresAt: daysAgo(5),
    metrics: {
      profileViews: 98,
      clicks: 12,
      couponsRedeemed: 3,
      messagesReceived: 2,
    },
    createdAt: daysAgo(120),
  },
  {
    id: 'store-pending',
    ownerId: 'user-pending',
    name: 'TechMEI Santa Paula',
    description:
      'Consultoria e suporte para MEIs de Santa Paula. Aguardando aprovação do Vizzy Sanca.',
    categoryId: 'cat-services',
    logo: IMAGES.services as ImageKey,
    coverImage: IMAGES.services as ImageKey,
    address: 'Rua Piauí, 210 - Santa Paula, São Caetano do Sul',
    phone: '1142288008',
    whatsapp: '5511911118008',
    hours: 'Seg-Sex 9h às 17h',
    latitude: -23.6295,
    longitude: -46.569,
    status: 'pending',
    subscriptionStatus: 'pending',
    metrics: {
      profileViews: 0,
      clicks: 0,
      couponsRedeemed: 0,
      messagesReceived: 0,
    },
    createdAt: daysAgo(2),
  },
];

export const seedPromotions: Promotion[] = [
  {
    id: 'promo-1',
    storeId: 'store-1',
    title: 'Café + pão na chapa R$ 12 no Centro',
    description: 'Válido até 18h na Padaria Pão de Sanca, perto da Praça dos Três Poderes.',
    image: IMAGES.coffee as ImageKey,
    actionLabel: 'Ver oferta',
    createdAt: daysAgo(1),
    expiresAt: daysFromNow(7),
  },
  {
    id: 'promo-2',
    storeId: 'store-2',
    title: '20% hidratação — Santa Paula',
    description: 'Primeira visita no Studio Marina. Bairro de serviços de Sanca.',
    image: IMAGES.salon as ImageKey,
    actionLabel: 'Agendar',
    createdAt: daysAgo(2),
    expiresAt: daysFromNow(14),
  },
  {
    id: 'promo-3',
    storeId: 'store-6',
    title: 'Combo burger + refri no Olímpico',
    description: 'Terça e quarta com 15% off no Burger Olímpico. Peça pelo app ou WhatsApp.',
    image: IMAGES.coffee as ImageKey,
    actionLabel: 'Pedir agora',
    createdAt: daysAgo(1),
    expiresAt: daysFromNow(10),
  },
  {
    id: 'promo-4',
    storeId: 'store-3',
    title: 'Hortifruti da semana — Barcelona',
    description: 'Cesta de frutas e verduras com preço de bairro no Mercado Barcelona Fresh.',
    image: IMAGES.market as ImageKey,
    actionLabel: 'Ver cesta',
    createdAt: daysAgo(3),
    expiresAt: daysFromNow(5),
  },
];

export const seedCoupons: Coupon[] = [
  {
    id: 'coupon-1',
    storeId: 'store-1',
    code: 'SANCA10',
    title: '10% café da manhã no Centro',
    description: 'Segunda a sexta até 11h. Padaria Pão de Sanca.',
    discountPercent: 10,
    validFrom: daysAgo(5),
    validUntil: daysFromNow(20),
    maxRedemptions: 100,
    redeemedCount: 31,
  },
  {
    id: 'coupon-2',
    storeId: 'store-2',
    code: 'PAULA20',
    title: '20% em qualquer serviço',
    description: 'Santa Paula. Primeira visita.',
    discountPercent: 20,
    validFrom: daysAgo(2),
    validUntil: daysFromNow(10),
    maxRedemptions: 50,
    redeemedCount: 14,
  },
  {
    id: 'coupon-3',
    storeId: 'store-6',
    code: 'OLIMPICO15',
    title: '15% no burger',
    description: 'Bairro Olímpico. Válido ter e qua.',
    discountPercent: 15,
    validFrom: daysAgo(1),
    validUntil: daysFromNow(14),
    maxRedemptions: 80,
    redeemedCount: 12,
  },
  {
    id: 'coupon-4',
    storeId: 'store-3',
    code: 'BARCELONA5',
    title: 'R$ 5 off na compra',
    description: 'Compra mínima R$ 50 no Mercado Barcelona Fresh.',
    discountPercent: 5,
    validFrom: daysAgo(3),
    validUntil: daysFromNow(12),
    maxRedemptions: 60,
    redeemedCount: 7,
  },
];

export const seedThreads: ChatThread[] = [
  {
    id: 'thread-1',
    consumerId: 'user-1',
    storeId: 'store-1',
    lastMessage: 'Vocês entregam no Barcelona?',
    updatedAt: daysAgo(0),
  },
];

export const seedMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    threadId: 'thread-1',
    senderId: 'user-1',
    senderRole: 'consumer',
    text: 'Vocês entregam no Barcelona?',
    createdAt: daysAgo(0),
  },
  {
    id: 'msg-2',
    threadId: 'thread-1',
    senderId: 'user-store-1',
    senderRole: 'store',
    text: 'Sim! Entregamos em todo São Caetano — Centro, Barcelona, Olímpico e bairros vizinhos.',
    createdAt: daysAgo(0),
  },
];

export { defaultUserLocation };

export const demoPasswords: Record<string, string> = {
  'ana@email.com': '123456',
  'loja@padaria.com': '123456',
  'loja@beleza.com': '123456',
  'loja@mercado.com': '123456',
  'admin@vizzy.com': 'admin123',
  'admin@esentinel.com': 'admin123',
};

export function hydrateMedia(state: AppState): AppState {
  const stores = state.stores.map((s) => ({
    ...s,
    logo: normalizeImageRef(s.logo, coverForCategory(s.categoryId)),
    coverImage: normalizeImageRef(s.coverImage, coverForCategory(s.categoryId)),
  }));
  const promotions = state.promotions.map((p) => {
    const store = stores.find((s) => s.id === p.storeId);
    return {
      ...p,
      image: normalizeImageRef(
        p.image,
        promoImageForTitle(p.title, store?.categoryId)
      ),
    };
  });
  return { ...state, stores, promotions };
}

export function createInitialState(): AppState {
  return hydrateMedia({
    users: seedUsers,
    stores: seedStores,
    categories: defaultCategories,
    promotions: seedPromotions,
    coupons: seedCoupons,
    threads: seedThreads,
    messages: seedMessages,
    redeemedCoupons: [],
    currentUserId: null,
    userLocation: defaultUserLocation,
  });
}
