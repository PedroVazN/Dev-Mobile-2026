# Vizzy Sanca — Modelo de dados (PostgreSQL sugerido)

MVP focado em **São Caetano do Sul**. Usa dados mock em memória + AsyncStorage. Para produção, use o esquema abaixo com geolocalização por bairro/CEP.

## Tabelas principais

### users
| Coluna | Tipo |
|--------|------|
| id | UUID PK |
| name | VARCHAR |
| email | VARCHAR UNIQUE |
| phone | VARCHAR |
| password_hash | VARCHAR |
| role | ENUM(consumer, store, admin) |
| interests | JSONB |
| created_at | TIMESTAMP |

### stores
| Coluna | Tipo |
|--------|------|
| id | UUID PK |
| owner_id | UUID FK → users |
| name | VARCHAR |
| description | TEXT |
| category_id | UUID FK |
| address | TEXT |
| phone | VARCHAR |
| whatsapp | VARCHAR |
| hours | VARCHAR |
| latitude | DECIMAL |
| longitude | DECIMAL |
| status | ENUM(pending, approved, blocked) |
| subscription_status | ENUM(active, expired, cancelled, pending) |
| subscription_expires_at | TIMESTAMP |

### categories
| id, name, icon |

### promotions
| id, store_id, title, description, image_url, action_label, expires_at |

### coupons
| id, store_id, code, title, discount_percent, valid_from, valid_until, max_redemptions |

### coupon_redemptions
| id, coupon_id, user_id, redeemed_at |

### chat_threads
| id, consumer_id, store_id, updated_at |

### chat_messages
| id, thread_id, sender_id, text, created_at |

### subscriptions (pagamentos)
| id, store_id, provider, external_id, amount, status, period_start, period_end |

## Regras de negócio
- Lojas só aparecem no feed com `status = approved` e `subscription_status = active`.
- Cupons respeitam `valid_until` e `max_redemptions`.
- Usuários consumidores são gratuitos.
