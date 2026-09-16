import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { EmptyState } from '../../components/EmptyState';
import { useApp } from '../../context/AppContext';
import { cores, espacamento, raio, tipografia } from '../../constants/theme';
import type { ConsumerStackParamList } from '../../navigation/types';

export function ChatScreen() {
  const { state, currentUser } = useApp();
  const navigation =
    useNavigation<NativeStackNavigationProp<ConsumerStackParamList>>();

  const threads = state.threads.filter((t) => t.consumerId === currentUser?.id);

  return (
    <Screen scroll={false}>
      <Text style={styles.title}>Conversas</Text>
      {threads.length === 0 ? (
        <EmptyState
          icon="chatbubbles-outline"
          title="Nenhuma conversa ainda"
          subtitle="Abra o perfil de uma loja e toque em Chat"
        />
      ) : (
        <FlatList
          data={threads}
          keyExtractor={(t) => t.id}
          renderItem={({ item }) => {
            const store = state.stores.find((s) => s.id === item.storeId);
            return (
              <Pressable
                style={styles.row}
                onPress={() =>
                  navigation.navigate('ChatRoom', {
                    threadId: item.id,
                    storeName: store?.name ?? 'Loja',
                  })
                }
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {store?.name?.charAt(0) ?? 'L'}
                  </Text>
                </View>
                <View style={styles.body}>
                  <Text style={styles.name}>{store?.name}</Text>
                  <Text style={styles.preview} numberOfLines={1}>
                    {item.lastMessage ?? 'Nova conversa'}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...tipografia.titulo, marginBottom: espacamento.md, paddingHorizontal: espacamento.md },
  row: {
    flexDirection: 'row',
    padding: espacamento.md,
    backgroundColor: cores.fundoCard,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: cores.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: '700', color: cores.primary },
  body: { flex: 1 },
  name: { fontWeight: '700', fontSize: 16, color: cores.texto },
  preview: { color: cores.textoSecundario, marginTop: 4 },
});
