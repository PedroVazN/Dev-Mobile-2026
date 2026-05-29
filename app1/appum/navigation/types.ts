import type { UserRole } from '../types';

export type AuthStackParamList = {
  Welcome: undefined;
  RoleSelect: undefined;
  Login: { role?: UserRole };
  Register: { role: UserRole };
};

export type ConsumerStackParamList = {
  ConsumerTabs: undefined;
  StoreDetail: { storeId: string };
  ChatRoom: { threadId: string; storeName: string };
};

export type StoreStackParamList = {
  StoreTabs: undefined;
};

export type AdminStackParamList = {
  AdminTabs: undefined;
};
