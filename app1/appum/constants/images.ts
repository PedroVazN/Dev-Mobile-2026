import { ImageSourcePropType } from 'react-native';

export type ImageKey =
  | 'bakery'
  | 'coffee'
  | 'cake'
  | 'salon'
  | 'market'
  | 'fashion'
  | 'services'
  | 'pets'
  | 'fallback';

/** Imagens em assets/images/ (Unsplash — licença livre). */
const fallbackImg = require('../assets/images/fallback.jpg');

export const IMAGE_ASSETS: Record<ImageKey, ImageSourcePropType> = {
  bakery: require('../assets/images/bakery.jpg'),
  coffee: require('../assets/images/coffee.jpg'),
  cake: require('../assets/images/cake.jpg'),
  salon: require('../assets/images/salon.jpg'),
  market: require('../assets/images/market.jpg'),
  fashion: require('../assets/images/fashion.jpg'),
  services: require('../assets/images/services.jpg'),
  pets: require('../assets/images/pets.jpg'),
  fallback: fallbackImg,
};

export const IMAGES: Record<ImageKey, ImageKey> = {
  bakery: 'bakery',
  coffee: 'coffee',
  cake: 'cake',
  salon: 'salon',
  market: 'market',
  fashion: 'fashion',
  services: 'services',
  pets: 'pets',
  fallback: 'fallback',
};

const categoryCover: Record<string, ImageKey> = {
  'cat-food': 'bakery',
  'cat-fashion': 'fashion',
  'cat-beauty': 'salon',
  'cat-services': 'services',
  'cat-market': 'market',
  'cat-pets': 'pets',
};

export function coverForCategory(categoryId: string): ImageKey {
  return categoryCover[categoryId] ?? 'fallback';
}

export function promoImageForTitle(title: string, categoryId?: string): ImageKey {
  const t = title.toLowerCase();
  if (t.includes('café') || t.includes('cafe')) return 'coffee';
  if (t.includes('bolo')) return 'cake';
  if (t.includes('hidratação') || t.includes('cabelo')) return 'salon';
  if (categoryId) return coverForCategory(categoryId);
  return 'fallback';
}

const IMAGE_KEYS = new Set<string>(Object.keys(IMAGE_ASSETS));

/** Aceita chave local (`coffee`), URL antiga ou vazio. */
export function resolveImageSource(ref?: string): ImageSourcePropType {
  if (!ref) return IMAGE_ASSETS.fallback;
  if (IMAGE_KEYS.has(ref)) return IMAGE_ASSETS[ref as ImageKey];
  if (ref === 'default') return IMAGE_ASSETS.fallback;
  if (ref.startsWith('http')) return { uri: ref };
  return IMAGE_ASSETS.fallback;
}

/** Converte dados salvos com URLs antigas para chaves locais. */
export function normalizeImageRef(ref?: string, fallbackKey?: ImageKey): ImageKey {
  if (ref === 'default') return fallbackKey ?? 'fallback';
  if (ref && IMAGE_KEYS.has(ref)) return ref as ImageKey;
  if (ref?.startsWith('http')) return fallbackKey ?? 'fallback';
  return fallbackKey ?? 'fallback';
}
