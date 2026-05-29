import { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../components/Screen';
import { PromoCard } from '../../components/PromoCard';
import { StoreCard } from '../../components/StoreCard';
import { PageHeader } from '../../components/PageHeader';
import { useApp } from '../../context/AppContext';
import { CITY } from '../../constants/city';
import { CityBadge } from '../../components/CityBadge';
import { cores, espacamento, raio, sombra } from '../../constants/theme';
import type { ConsumerStackParamList } from '../../navigation/types';

export function HomeScreen() {
  const { state, getRecommendedStores, refreshLocation, currentUser, toggleFavorite } =
    useApp();
  const navigation =
    useNavigation<NativeStackNavigationProp<ConsumerStackParamList>>();

  useEffect(() => {
    refreshLocation();
  }, [refreshLocation]);

  const recommended = getRecommendedStores();
  const promos = state.promotions
    .filter((p) => {
      const store = state.stores.find((s) => s.id === p.storeId);
      return store?.status === 'approved' && store.subscriptionStatus === 'active';
    })
    .slice(0, 5);

  const firstName = currentUser?.name?.split(' ')[0] ?? 'visitante';

  return (
    <Screen>
      <CityBadge compact />
      <PageHeader
        title={`Olá, ${firstName}!`}
        subtitle={`Ofertas em ${CITY.nickname} — Centro, Santa Paula, Barcelona e mais`}
      />

      <Pressable
        style={({ pressed }) => [styles.locationPill, pressed && styles.pillPressed]}
        onPress={refreshLocation}
      >
        <Ionicons name="location" size={18} color={cores.primary} />
        <Text style={styles.locationText} numberOfLines={1}>
          {state.userLocation.label}
        </Text>
        <Ionicons name="refresh" size={16} color={cores.textoSecundario} />
      </Pressable>

      <Text style={styles.section}>Promoções em São Caetano</Text>
      {promos.length === 0 ? (
        <Text style={styles.emptyHint}>Nenhuma promoção no momento.</Text>
      ) : (
        promos.map((p) => {
          const store = state.stores.find((s) => s.id === p.storeId);
          return (
            <PromoCard
              key={p.id}
              promotion={p}
              store={store}
              onPress={() =>
                store && navigation.navigate('StoreDetail', { storeId: store.id })
              }
            />
          );
        })
      )}

      <View style={styles.sectionRow}>
        <Text style={styles.section}>Para você</Text>
        <View style={styles.aiBadge}>
          <Ionicons name="sparkles" size={12} color={cores.primary} />
          <Text style={styles.aiText}>IA</Text>
        </View>
      </View>
      <Text style={styles.aiHint}>
        Sugestões por localização e seus interesses
      </Text>
      {recommended.map((store) => {
        const cat = state.categories.find((c) => c.id === store.categoryId);
        return (
          <StoreCard
            key={store.id}
            store={store}
            categoryName={cat?.name}
            distanceKm={store.distanceKm}
            isFavorite={currentUser?.favoriteStoreIds.includes(store.id)}
            onToggleFavorite={() => void toggleFavorite(store.id)}
            onPress={() => navigation.navigate('StoreDetail', { storeId: store.id })}
          />
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: cores.fundoCard,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: raio.pill,
    borderWidth: 1,
    borderColor: cores.borda,
    marginBottom: espacamento.lg,
    ...sombra.suave,
  },
  pillPressed: { opacity: 0.9 },
  locationText: {
    flex: 1,
    color: cores.texto,
    fontWeight: '600',
    fontSize: 14,
  },
  section: { fontSize: 18, fontWeight: '700', color: cores.texto },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: espacamento.sm,
    marginBottom: 4,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: cores.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: raio.pill,
  },
  aiText: { fontSize: 11, fontWeight: '800', color: cores.primary },
  aiHint: {
    fontSize: 13,
    color: cores.textoSecundario,
    marginBottom: espacamento.md,
  },
  emptyHint: {
    fontSize: 14,
    color: cores.textoSecundario,
    marginBottom: espacamento.lg,
  },
});
