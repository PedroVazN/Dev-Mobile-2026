import * as Location from 'expo-location';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type {
  AppState,
  Coupon,
  Promotion,
  Store,
  SubscriptionStatus,
  User,
  UserRole,
} from '../types';
import { createInitialState, demoPasswords } from '../data/mockData';
import { promoImageForTitle } from '../constants/images';
import { loadAppState, saveAppState } from '../services/storage';
import { recommendStores } from '../utils/recommendations';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  storeName?: string;
  categoryId?: string;
  address?: string;
}

interface AppContextValue {
  ready: boolean;
  state: AppState;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  register: (input: RegisterInput) => Promise<{ ok: boolean; error?: string }>;
  toggleFavorite: (storeId: string) => Promise<void>;
  redeemCoupon: (couponId: string) => Promise<{ ok: boolean; error?: string }>;
  sendMessage: (threadId: string, text: string) => Promise<void>;
  startChatWithStore: (storeId: string) => Promise<string>;
  createPromotion: (
    input: Omit<Promotion, 'id' | 'storeId' | 'createdAt'>
  ) => Promise<void>;
  createCoupon: (input: Omit<Coupon, 'id' | 'storeId' | 'redeemedCount'>) => Promise<void>;
  updateStoreProfile: (storeId: string, patch: Partial<Store>) => Promise<void>;
  approveStore: (storeId: string) => Promise<void>;
  blockStore: (storeId: string) => Promise<void>;
  setSubscription: (storeId: string, status: SubscriptionStatus) => Promise<void>;
  addCategory: (name: string, icon: string) => Promise<void>;
  refreshLocation: () => Promise<void>;
  getVisibleStores: () => Store[];
  getRecommendedStores: () => ReturnType<typeof recommendStores>;
  hasRedeemedCoupon: (couponId: string) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(createInitialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadAppState().then((loaded) => {
      setState(loaded);
      setReady(true);
    });
  }, []);

  const persist = useCallback((updater: AppState | ((prev: AppState) => AppState)) => {
    setState((prev) => {
      const next =
        typeof updater === 'function'
          ? (updater as (p: AppState) => AppState)(prev)
          : updater;
      void saveAppState(next);
      return next;
    });
  }, []);

  const currentUser = useMemo(
    () => state.users.find((u) => u.id === state.currentUserId) ?? null,
    [state.currentUserId, state.users]
  );

  const getVisibleStores = useCallback(() => {
    return state.stores.filter(
      (s) => s.status === 'approved' && s.subscriptionStatus === 'active'
    );
  }, [state.stores]);

  const getRecommendedStores = useCallback(() => {
    if (!currentUser || currentUser.role !== 'consumer') return [];
    return recommendStores(
      state.stores,
      currentUser,
      state.userLocation.latitude,
      state.userLocation.longitude
    );
  }, [currentUser, state.stores, state.userLocation]);

  const login = useCallback(
    async (email: string, password: string) => {
      const normalized = email.trim().toLowerCase();
      const expected = demoPasswords[normalized];
      if (!expected || expected !== password) {
        return { ok: false, error: 'E-mail ou senha incorretos.' };
      }
      const user = state.users.find((u) => u.email.toLowerCase() === normalized);
      if (!user) return { ok: false, error: 'Usuário não encontrado.' };
      persist((prev) => ({ ...prev, currentUserId: user.id }));
      return { ok: true };
    },
    [persist, state]
  );

  const logout = useCallback(async () => {
    persist((prev) => ({ ...prev, currentUserId: null }));
  }, [persist]);

  const register = useCallback(
    async (input: RegisterInput) => {
      const email = input.email.trim().toLowerCase();
      if (state.users.some((u) => u.email.toLowerCase() === email)) {
        return { ok: false, error: 'Este e-mail já está cadastrado.' };
      }

      const userId = uid('user');
      const newUser: User = {
        id: userId,
        name: input.name.trim(),
        email,
        phone: input.phone,
        role: input.role,
        interests: input.role === 'consumer' ? ['cat-food'] : [],
        favoriteStoreIds: [],
        createdAt: new Date().toISOString(),
      };

      let nextStores = [...state.stores];
      if (input.role === 'store') {
        const storeId = uid('store');
        newUser.storeId = storeId;
        nextStores.push({
          id: storeId,
          ownerId: userId,
          name: input.storeName ?? 'Minha Loja',
          description: 'Complete seu perfil comercial.',
          categoryId: input.categoryId ?? 'cat-services',
          address: input.address ?? '',
          phone: input.phone ?? '',
          whatsapp: input.phone ?? '',
          hours: 'A definir',
          latitude: state.userLocation.latitude,
          longitude: state.userLocation.longitude,
          status: 'pending',
          subscriptionStatus: 'pending',
          metrics: {
            profileViews: 0,
            clicks: 0,
            couponsRedeemed: 0,
            messagesReceived: 0,
          },
          createdAt: new Date().toISOString(),
        });
      }

      demoPasswords[email] = input.password;
      persist((prev) => ({
        ...prev,
        users: [...prev.users, newUser],
        stores: nextStores,
        currentUserId: userId,
      }));
      return { ok: true };
    },
    [persist, state]
  );

  const toggleFavorite = useCallback(
    async (storeId: string) => {
      persist((prev) => {
        const user = prev.users.find((u) => u.id === prev.currentUserId);
        if (!user) return prev;
        const favorites = user.favoriteStoreIds.includes(storeId)
          ? user.favoriteStoreIds.filter((id) => id !== storeId)
          : [...user.favoriteStoreIds, storeId];
        return {
          ...prev,
          users: prev.users.map((u) =>
            u.id === user.id ? { ...u, favoriteStoreIds: favorites } : u
          ),
        };
      });
    },
    [persist]
  );

  const hasRedeemedCoupon = useCallback(
    (couponId: string) => {
      if (!currentUser) return false;
      return state.redeemedCoupons.some(
        (r) => r.couponId === couponId && r.userId === currentUser.id
      );
    },
    [currentUser, state.redeemedCoupons]
  );

  const redeemCoupon = useCallback(
    async (couponId: string) => {
      let result: { ok: boolean; error?: string } = { ok: false, error: 'Erro.' };

      persist((prev) => {
        const user = prev.users.find((u) => u.id === prev.currentUserId);
        if (!user) {
          result = { ok: false, error: 'Faça login primeiro.' };
          return prev;
        }
        const coupon = prev.coupons.find((c) => c.id === couponId);
        if (!coupon) {
          result = { ok: false, error: 'Cupom não encontrado.' };
          return prev;
        }
        if (new Date(coupon.validUntil) < new Date()) {
          result = { ok: false, error: 'Cupom expirado.' };
          return prev;
        }
        if (coupon.redeemedCount >= coupon.maxRedemptions) {
          result = { ok: false, error: 'Cupom esgotado.' };
          return prev;
        }
        if (
          prev.redeemedCoupons.some(
            (r) => r.couponId === couponId && r.userId === user.id
          )
        ) {
          result = { ok: false, error: 'Você já resgatou este cupom.' };
          return prev;
        }

        result = { ok: true };
        return {
          ...prev,
          coupons: prev.coupons.map((c) =>
            c.id === couponId ? { ...c, redeemedCount: c.redeemedCount + 1 } : c
          ),
          stores: prev.stores.map((s) =>
            s.id === coupon.storeId
              ? {
                  ...s,
                  metrics: {
                    ...s.metrics,
                    couponsRedeemed: s.metrics.couponsRedeemed + 1,
                  },
                }
              : s
          ),
          redeemedCoupons: [
            ...prev.redeemedCoupons,
            {
              id: uid('redeemed'),
              couponId,
              userId: user.id,
              redeemedAt: new Date().toISOString(),
            },
          ],
        };
      });

      return result;
    },
    [persist]
  );

  const sendMessage = useCallback(
    async (threadId: string, text: string) => {
      if (!text.trim()) return;
      persist((prev) => {
        const user = prev.users.find((u) => u.id === prev.currentUserId);
        const thread = prev.threads.find((t) => t.id === threadId);
        if (!user || !thread) return prev;

        const message = {
          id: uid('msg'),
          threadId,
          senderId: user.id,
          senderRole: user.role,
          text: text.trim(),
          createdAt: new Date().toISOString(),
        };

        const stores =
          user.role === 'consumer'
            ? prev.stores.map((s) =>
                s.id === thread.storeId
                  ? {
                      ...s,
                      metrics: {
                        ...s.metrics,
                        messagesReceived: s.metrics.messagesReceived + 1,
                      },
                    }
                  : s
              )
            : prev.stores;

        return {
          ...prev,
          stores,
          messages: [...prev.messages, message],
          threads: prev.threads.map((t) =>
            t.id === threadId
              ? { ...t, lastMessage: message.text, updatedAt: message.createdAt }
              : t
          ),
        };
      });
    },
    [persist]
  );

  const startChatWithStore = useCallback(
    async (storeId: string) => {
      let threadId = '';
      persist((prev) => {
        const user = prev.users.find((u) => u.id === prev.currentUserId);
        if (!user) return prev;
        const existing = prev.threads.find(
          (t) => t.consumerId === user.id && t.storeId === storeId
        );
        if (existing) {
          threadId = existing.id;
          return prev;
        }
        const thread = {
          id: uid('thread'),
          consumerId: user.id,
          storeId,
          updatedAt: new Date().toISOString(),
        };
        threadId = thread.id;
        return { ...prev, threads: [...prev.threads, thread] };
      });
      return threadId;
    },
    [persist]
  );

  const createPromotion = useCallback(
    async (input: Omit<Promotion, 'id' | 'storeId' | 'createdAt'>) => {
      persist((prev) => {
        const user = prev.users.find((u) => u.id === prev.currentUserId);
        if (!user?.storeId) return prev;
        const store = prev.stores.find((s) => s.id === user.storeId);
        const promo: Promotion = {
          ...input,
          id: uid('promo'),
          storeId: user.storeId,
          createdAt: new Date().toISOString(),
          image:
            input.image ?? promoImageForTitle(input.title, store?.categoryId),
        };
        return { ...prev, promotions: [promo, ...prev.promotions] };
      });
    },
    [persist]
  );

  const createCoupon = useCallback(
    async (input: Omit<Coupon, 'id' | 'storeId' | 'redeemedCount'>) => {
      persist((prev) => {
        const user = prev.users.find((u) => u.id === prev.currentUserId);
        if (!user?.storeId) return prev;
        const coupon: Coupon = {
          id: uid('coupon'),
          storeId: user.storeId,
          redeemedCount: 0,
          ...input,
        };
        return { ...prev, coupons: [coupon, ...prev.coupons] };
      });
    },
    [persist]
  );

  const updateStoreProfile = useCallback(
    async (storeId: string, patch: Partial<Store>) => {
      persist((prev) => ({
        ...prev,
        stores: prev.stores.map((s) =>
          s.id === storeId ? { ...s, ...patch } : s
        ),
      }));
    },
    [persist]
  );

  const approveStore = useCallback(
    async (storeId: string) => {
      persist((prev) => ({
        ...prev,
        stores: prev.stores.map((s) =>
          s.id === storeId
            ? {
                ...s,
                status: 'approved' as const,
                subscriptionStatus: 'active' as const,
                subscriptionExpiresAt: new Date(
                  Date.now() + 30 * 24 * 60 * 60 * 1000
                ).toISOString(),
              }
            : s
        ),
      }));
    },
    [persist]
  );

  const blockStore = useCallback(
    async (storeId: string) => {
      persist((prev) => ({
        ...prev,
        stores: prev.stores.map((s) =>
          s.id === storeId ? { ...s, status: 'blocked' as const } : s
        ),
      }));
    },
    [persist]
  );

  const setSubscription = useCallback(
    async (storeId: string, status: SubscriptionStatus) => {
      persist((prev) => ({
        ...prev,
        stores: prev.stores.map((s) =>
          s.id === storeId
            ? {
                ...s,
                subscriptionStatus: status,
                subscriptionExpiresAt:
                  status === 'active'
                    ? new Date(
                        Date.now() + 30 * 24 * 60 * 60 * 1000
                      ).toISOString()
                    : s.subscriptionExpiresAt,
              }
            : s
        ),
      }));
    },
    [persist]
  );

  const addCategory = useCallback(
    async (name: string, icon: string) => {
      persist((prev) => ({
        ...prev,
        categories: [...prev.categories, { id: uid('cat'), name, icon }],
      }));
    },
    [persist]
  );

  const refreshLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const pos = await Location.getCurrentPositionAsync({});
      persist((prev) => ({
        ...prev,
        userLocation: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          label: 'Sua localização em Sanca',
        },
      }));
    } catch {
      /* mantém localização simulada */
    }
  }, [persist]);

  const value: AppContextValue = {
    ready,
    state,
    currentUser,
    login,
    logout,
    register,
    toggleFavorite,
    redeemCoupon,
    sendMessage,
    startChatWithStore,
    createPromotion,
    createCoupon,
    updateStoreProfile,
    approveStore,
    blockStore,
    setSubscription,
    addCategory,
    refreshLocation,
    getVisibleStores,
    getRecommendedStores,
    hasRedeemedCoupon,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de AppProvider');
  return ctx;
}
