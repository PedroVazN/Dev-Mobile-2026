# Vizzy — Backend fictício (MVP)

O app atual simula um backend Node.js via:

- `data/mockData.ts` — dados iniciais
- `context/AppContext.tsx` — regras de negócio
- `services/storage.ts` — persistência local (AsyncStorage)

## Endpoints sugeridos (futuro Node.js + Express)

```
POST   /auth/register
POST   /auth/login
GET    /stores?lat=&lng=&radius=&category=
GET    /stores/:id
POST   /stores/:id/favorite
GET    /promotions/feed
POST   /stores/:id/promotions
GET    /coupons
POST   /coupons/:id/redeem
GET    /chat/threads
POST   /chat/threads/:id/messages
GET    /admin/stores
PATCH  /admin/stores/:id/approve
PATCH  /admin/stores/:id/subscription
POST   /webhooks/payment (Stripe / Mercado Pago / Asaas)
```

## Integrações planejadas
- **Auth:** Firebase Auth ou JWT + OAuth Google
- **Chat:** Socket.io ou Firebase Realtime
- **Push:** Expo Notifications + FCM
- **IA:** endpoint `/recommendations` com scoring por localização e histórico
