import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Store } from '../types';
import { cores, raio, espacamento, sombra, tipografia } from '../constants/theme';
import { formatDistance } from '../utils/geo';
import { RemoteImage } from './RemoteImage';
import { IconButton } from './IconButton';

type Props = {
  store: Store;
  categoryName?: string;
  distanceKm?: number;
  onPress: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

export function StoreCard({
  store,
  categoryName,
  distanceKm,
  onPress,
  isFavorite,
  onToggleFavorite,
}: Props) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
        android_ripple={{ color: cores.primaryLight }}
      >
        {store.coverImage ? (
          <RemoteImage uri={store.coverImage} aspectRatio={2.2} style={styles.cover} />
        ) : null}
        <View style={styles.row}>
          <View style={styles.iconBox}>
            {store.logo ? (
              <RemoteImage uri={store.logo} aspectRatio={1} style={styles.logo} />
            ) : (
              <Ionicons name="storefront" size={26} color={cores.primary} />
            )}
          </View>
          <View style={styles.body}>
            <Text style={styles.name}>{store.name}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.meta} numberOfLines={1}>
                {categoryName ?? 'Comércio local'}
              </Text>
              {distanceKm != null ? (
                <View style={styles.distBadge}>
                  <Ionicons name="navigate" size={11} color={cores.primary} />
                  <Text style={styles.distText}>{formatDistance(distanceKm)}</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.desc} numberOfLines={2}>
              {store.description}
            </Text>
          </View>
        </View>
      </Pressable>

      {onToggleFavorite ? (
        <IconButton
          icon={isFavorite ? 'heart' : 'heart-outline'}
          onPress={onToggleFavorite}
          filled={isFavorite}
          color={isFavorite ? '#fff' : cores.textoSecundario}
          style={styles.favBtn}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: cores.fundoCard,
    borderRadius: raio.lg,
    marginBottom: espacamento.md,
    borderWidth: 1,
    borderColor: cores.borda,
    overflow: 'hidden',
    ...sombra.card,
  },
  pressed: { opacity: 0.96 },
  cover: { borderRadius: 0 },
  row: {
    flexDirection: 'row',
    padding: espacamento.md,
    gap: 12,
    alignItems: 'center',
    paddingRight: 56,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: raio.md,
    backgroundColor: cores.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logo: { width: 48, height: 48, borderRadius: raio.md },
  body: { flex: 1 },
  name: { ...tipografia.subtitulo, fontSize: 16 },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  meta: { fontSize: 12, color: cores.textoSecundario, flexShrink: 1 },
  distBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: cores.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: raio.pill,
  },
  distText: { fontSize: 11, fontWeight: '700', color: cores.primary },
  desc: { fontSize: 13, color: cores.textoSecundario, marginTop: 6, lineHeight: 18 },
  favBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
});
