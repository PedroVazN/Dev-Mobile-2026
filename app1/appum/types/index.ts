export type UserRole = 'consumer' | 'store' | 'admin';

export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'pending';

export type StoreStatus = 'approved' | 'pending' | 'blocked';

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  storeId?: string;
  interests: string[];
  favoriteStoreIds: string[];
  createdAt: string;
}

export interface Store {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  categoryId: string;
  logo?: string;
  coverImage?: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: string;
  latitude: number;
  longitude: number;
  status: StoreStatus;
  subscriptionStatus: SubscriptionStatus;
  subscriptionExpiresAt?: string;
  metrics: StoreMetrics;
  createdAt: string;
}

export interface StoreMetrics {
  profileViews: number;
  clicks: number;
  couponsRedeemed: number;
  messagesReceived: number;
}

export interface Promotion {
  id: string;
  storeId: string;
  title: string;
  description: string;
  image?: string;
  actionLabel: string;
  createdAt: string;
  expiresAt: string;
}

export interface Coupon {
  id: string;
  storeId: string;
  code: string;
  title: string;
  description: string;
  discountPercent: number;
  validFrom: string;
  validUntil: string;
  maxRedemptions: number;
  redeemedCount: number;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  senderRole: UserRole;
  text: string;
  createdAt: string;
}

export interface ChatThread {
  id: string;
  consumerId: string;
  storeId: string;
  lastMessage?: string;
  updatedAt: string;
}

export interface RedeemedCoupon {
  id: string;
  couponId: string;
  userId: string;
  redeemedAt: string;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  label: string;
}

export interface AppState {
  users: User[];
  stores: Store[];
  categories: Category[];
  promotions: Promotion[];
  coupons: Coupon[];
  threads: ChatThread[];
  messages: ChatMessage[];
  redeemedCoupons: RedeemedCoupon[];
  currentUserId: string | null;
  userLocation: UserLocation;
}
