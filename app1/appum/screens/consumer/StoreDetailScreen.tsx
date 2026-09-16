import { Linking, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { PromoCard } from '../../components/PromoCard';
import { CouponCard } from '../../components/CouponCard';
import { Badge } from '../../components/Badge';
import { RemoteImage } from '../../components/RemoteImage';
import { IconButton } from '../../components/IconButton';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { useLockedAction } from '../../hooks/useLockedAction';
import { distanceKm, formatDistance } from '../../utils/geo';
import { cores, espacamento, raio, sombra, tipografia } from '../../constants/theme';
import type { ConsumerStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<ConsumerStackParamList, 'StoreDetail'>;

export function StoreDetailScreen({ route, navigation }: Props) {
  const { storeId } = route.params;
  const {
    state,
    currentUser,
    toggleFavorite,
    startChatWithStore,
    redeemCoupon,
    hasRedeemedCoupon,
  } = useApp();
  const { showToast } = useToast();

  const store = state.stores.find((s) => s.id === storeId);
  const isFav = currentUser?.favoriteStoreIds.includes(storeId) ?? false;

  const { run: handleFavorite, loading: favLoading } = useLockedAction(async () => {
    await toggleFavorite(storeId);
    showToast(
      isFav ? 'Removido dos favoritos' : 'Loja favoritada!',
      'success'
    );
  });

  const { run: openChat, loading: chatLoading } = useLockedAction(async () => {
    const threadId = await startChatWithStore(storeId);
    navigation.navigate('ChatRoom', { threadId, storeName: store!.name });
  });

  if (!store) {
    return (
      <Screen>
        <Text>Loja não encontrada.</Text>
      </Screen>
    );
  }

  const cat = state.categories.find((c) => c.id === store.categoryId);
  const dist = distanceKm(
    state.userLocation.latitude,
    state.userLocation.longitude,
    store.latitude,
    store.longitude
  );
  const promos = state.promotions.filter((p) => p.storeId === storeId);
  const coupons = state.coupons.filter((c) => c.storeId === storeId);

  return (
    <Screen>
      <View style={styles.coverWrap}>
        {store.coverImage ? (
          <RemoteImage uri={store.coverImage} aspectRatio={2.2} style={styles.cover} />
        ) : (
          <View style={[styles.cover, styles.coverPlaceholder]} />
        )}
        <IconButton
          icon={isFav ? 'heart' : 'heart-outline'}
          onPress={handleFavorite}
          filled={isFav}
          color={isFav ? '#fff' : cores.accent}
          style={styles.favBtn}
          disabled={favLoading}
        />
      </View>

      <View style={styles.header}>
        <View style={styles.icon}>
          {store.logo ? (
            <RemoteImage uri={store.logo} aspectRatio={1} style={styles.logoImg} />
          ) : (
            <Ionicons name="storefront" size={36} color={cores.primary} />
          )}
        </View>
        <Text style={styles.name}>{store.name}</Text>
        <Text style={styles.meta}>
          {cat?.name} · {formatDistance(dist)}
        </Text>
        <Badge label="Loja verificada" tone="success" />
      </View>

      <Text style={styles.desc}>{store.description}</Text>
      <InfoRow icon="location-outline" text={store.address} />
      <InfoRow icon="time-outline" text={store.hours} />

      <View style={styles.actions}>
        <Button
          label="WhatsApp"
          onPress={() => Linking.openURL(`https://wa.me/${store.whatsapp}`)}
          style={styles.actionBtn}
          compact
        />
        <Button
          label="Ligar"
          variant="secondary"
          onPress={() => Linking.openURL(`tel:${store.phone}`)}
          style={styles.actionBtn}
          compact
        />
      </View>
      <Button
        label={chatLoading ? 'Abrindo chat...' : 'Chat com a loja'}
        onPress={openChat}
        loading={chatLoading}
      />

      <Text style={styles.section}>Promoções</Text>
      {promos.map((p) => (
        <PromoCard key={p.id} promotion={p} store={store} />
      ))}

      <Text style={styles.section}>Cupons</Text>
      {coupons.map((c) => (
        <CouponCard
          key={c.id}
          coupon={c}
          store={store}
          redeemed={hasRedeemedCoupon(c.id)}
          onRedeem={async () => {
            const r = await redeemCoupon(c.id);
            if (r.ok) {
              showToast(`Resgatado! Código: ${c.code}`, 'success');
            } else {
              showToast(r.error ?? 'Erro ao resgatar', 'error');
            }
            return r;
          }}
        />
      ))}
    </Screen>
  );
}

function InfoRow({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={18} color={cores.primary} />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  coverWrap: { position: 'relative', marginBottom: espacamento.md },
  cover: { borderRadius: raio.lg },
  coverPlaceholder: {
    height: 160,
    backgroundColor: cores.primaryLight,
  },
  favBtn: { position: 'absolute', top: 12, right: 12 },
  header: { alignItems: 'center', marginBottom: espacamento.md },
  icon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: cores.fundoCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: cores.fundoCard,
    marginTop: -36,
    ...sombra.card,
  },
  logoImg: { width: 72, height: 72, borderRadius: 36 },
  name: { ...tipografia.titulo, fontSize: 24, textAlign: 'center' },
  meta: { color: cores.textoSecundario, marginVertical: 6 },
  desc: { ...tipografia.corpo, marginBottom: espacamento.md },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
    backgroundColor: cores.fundoCard,
    padding: 12,
    borderRadius: raio.md,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  infoText: { flex: 1, fontSize: 14, color: cores.texto, lineHeight: 20 },
  actions: { flexDirection: 'row', gap: 8, marginVertical: espacamento.md },
  actionBtn: { flex: 1 },
  section: { ...tipografia.subtitulo, marginTop: espacamento.lg, marginBottom: 8 },
});
