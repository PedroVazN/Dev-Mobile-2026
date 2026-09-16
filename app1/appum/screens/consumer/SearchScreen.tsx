import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Input } from '../../components/Input';
import { StoreCard } from '../../components/StoreCard';
import { useApp } from '../../context/AppContext';
import { distanceKm } from '../../utils/geo';
import { CityBadge } from '../../components/CityBadge';
import { cores, espacamento, raio, tipografia } from '../../constants/theme';
import type { ConsumerStackParamList } from '../../navigation/types';

export function SearchScreen() {
  const { state, getVisibleStores, currentUser, toggleFavorite } = useApp();
  const navigation =
    useNavigation<NativeStackNavigationProp<ConsumerStackParamList>>();
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [maxKm, setMaxKm] = useState(10);

  const results = useMemo(() => {
    return getVisibleStores()
      .map((store) => ({
        store,
        dist: distanceKm(
          state.userLocation.latitude,
          state.userLocation.longitude,
          store.latitude,
          store.longitude
        ),
      }))
      .filter(({ store, dist }) => {
        if (dist > maxKm) return false;
        if (categoryId && store.categoryId !== categoryId) return false;
        if (query) {
          const q = query.toLowerCase();
          return (
            store.name.toLowerCase().includes(q) ||
            store.description.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => a.dist - b.dist);
  }, [getVisibleStores, state.userLocation, categoryId, query, maxKm]);

  return (
    <Screen scroll={false} padded={false}>
      <View style={styles.header}>
        <CityBadge compact />
        <Text style={styles.title}>Buscar em Sanca</Text>
        <Text style={styles.subtitle}>
          Lojas por bairro: Centro, Cerâmica, Santa Paula, Barcelona…
        </Text>
        <Input
          placeholder="Nome da loja..."
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
        <Text style={styles.filterLabel}>Categorias</Text>
        <FlatList
          horizontal
          data={[{ id: null, name: 'Todas', icon: 'apps' }, ...state.categories]}
          keyExtractor={(item) => item.id ?? 'all'}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.chip, categoryId === item.id && styles.chipActive]}
              onPress={() => setCategoryId(item.id)}
            >
              <Text
                style={[
                  styles.chipText,
                  categoryId === item.id && styles.chipTextActive,
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          )}
        />
        <View style={styles.distRow}>
          <Text style={styles.filterLabel}>Distância máx: {maxKm} km</Text>
          <View style={styles.distBtns}>
            {[2, 5, 10, 20].map((km) => (
              <Pressable
                key={km}
                style={[styles.distBtn, maxKm === km && styles.distBtnActive]}
                onPress={() => setMaxKm(km)}
              >
                <Text style={maxKm === km ? styles.distActive : styles.distText}>
                  {km}km
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.store.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const cat = state.categories.find((c) => c.id === item.store.categoryId);
          return (
            <StoreCard
              store={item.store}
              categoryName={cat?.name}
              distanceKm={item.dist}
              isFavorite={currentUser?.favoriteStoreIds.includes(item.store.id)}
              onToggleFavorite={() => void toggleFavorite(item.store.id)}
              onPress={() =>
                navigation.navigate('StoreDetail', { storeId: item.store.id })
              }
            />
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search" size={40} color={cores.textoSecundario} />
            <Text style={styles.emptyText}>Nenhuma loja encontrada</Text>
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: espacamento.md, paddingTop: espacamento.sm },
  title: { ...tipografia.titulo, marginBottom: 4 },
  subtitle: {
    fontSize: 13,
    color: cores.textoSecundario,
    marginBottom: espacamento.sm,
  },
  input: { marginBottom: espacamento.sm },
  filterLabel: { fontWeight: '600', color: cores.texto, marginBottom: 8 },
  chips: { paddingBottom: espacamento.sm, gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: raio.pill,
    backgroundColor: cores.fundoCard,
    borderWidth: 1,
    borderColor: cores.borda,
    marginRight: 8,
  },
  chipActive: { backgroundColor: cores.primary, borderColor: cores.primary },
  chipText: { fontSize: 13, color: cores.texto },
  chipTextActive: { color: '#fff', fontWeight: '700' },
  distRow: { marginBottom: espacamento.sm },
  distBtns: { flexDirection: 'row', gap: 8, marginTop: 6 },
  distBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: raio.pill,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  distBtnActive: { backgroundColor: cores.primaryLight, borderColor: cores.primary },
  distText: { fontSize: 13, color: cores.textoSecundario },
  distActive: { fontSize: 13, color: cores.primary, fontWeight: '700' },
  list: { paddingHorizontal: espacamento.md, paddingBottom: 24 },
  empty: { alignItems: 'center', padding: 40 },
  emptyText: { marginTop: 12, color: cores.textoSecundario },
});
