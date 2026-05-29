import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Promotion, Store } from '../types';
import { cores, raio, espacamento, sombra, tipografia } from '../constants/theme';
import { RemoteImage } from './RemoteImage';

type Props = {
  promotion: Promotion;
  store?: Store;
  onPress?: () => void;
};

export function PromoCard({ promotion, store, onPress }: Props) {
  return (
    <View style={styles.card}>
      {promotion.image ? (
        <Pressable onPress={onPress} disabled={!onPress}>
          <RemoteImage uri={promotion.image} style={styles.image} aspectRatio={2.1} />
        </Pressable>
      ) : null}
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.store}>{store?.name ?? 'Loja'}</Text>
          <Text style={styles.date}>
            até {new Date(promotion.expiresAt).toLocaleDateString('pt-BR')}
          </Text>
        </View>
        <Text style={styles.title}>{promotion.title}</Text>
        <Text style={styles.desc}>{promotion.description}</Text>
        {onPress ? (
          <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          >
            <Text style={styles.ctaText}>{promotion.actionLabel}</Text>
            <Ionicons name="arrow-forward-circle" size={22} color={cores.primary} />
          </Pressable>
        ) : null}
      </View>
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
  image: { borderRadius: 0 },
  body: { padding: espacamento.md },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  store: {
    fontSize: 12,
    fontWeight: '700',
    color: cores.primary,
    backgroundColor: cores.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: raio.pill,
    overflow: 'hidden',
  },
  date: { fontSize: 11, color: cores.textoSecundario },
  title: { ...tipografia.subtitulo, marginBottom: 6 },
  desc: { ...tipografia.corpo, marginBottom: 12 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: cores.primaryLight,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: raio.md,
  },
  ctaPressed: { opacity: 0.85 },
  ctaText: { fontSize: 15, fontWeight: '700', color: cores.primaryDark },
});
