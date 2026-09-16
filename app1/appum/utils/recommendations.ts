import type { Store, User } from '../types';
import { distanceKm } from './geo';

export interface ScoredStore extends Store {
  score: number;
  distanceKm: number;
}

export function recommendStores(
  stores: Store[],
  user: User,
  userLat: number,
  userLon: number,
  limit = 5
): ScoredStore[] {
  const visible = stores.filter(
    (s) => s.status === 'approved' && s.subscriptionStatus === 'active'
  );

  const scored: ScoredStore[] = visible.map((store) => {
    const dist = distanceKm(userLat, userLon, store.latitude, store.longitude);
    let score = 100 - dist * 8;

    if (user.interests.includes(store.categoryId)) score += 25;
    if (user.favoriteStoreIds.includes(store.id)) score += 30;
    score += store.metrics.profileViews * 0.01;

    return { ...store, score, distanceKm: dist };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
