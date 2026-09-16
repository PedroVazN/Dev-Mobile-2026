import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { EmptyState } from '../../components/EmptyState';
import { useApp } from '../../context/AppContext';
import { cores, espacamento, raio } from '../../constants/theme';

export function StoreMessagesScreen() {
  const { state, currentUser, sendMessage } = useApp();
  const storeId = currentUser?.storeId;
  const threads = state.threads.filter((t) => t.storeId === storeId);
  const [activeThread, setActiveThread] = useState<string | null>(
    threads[0]?.id ?? null
  );

  const messages = state.messages.filter((m) => m.threadId === activeThread);

  if (threads.length === 0) {
    return (
      <Screen>
        <EmptyState
          icon="mail-outline"
          title="Sem mensagens"
          subtitle="Quando clientes iniciarem chat, aparecerá aqui"
        />
      </Screen>
    );
  }

  return (
    <Screen scroll={false}>
      <Text style={styles.title}>Mensagens</Text>
      <FlatList
        horizontal
        data={threads}
        keyExtractor={(t) => t.id}
        style={styles.threadList}
        renderItem={({ item }) => {
          const user = state.users.find((u) => u.id === item.consumerId);
          return (
            <Pressable
              style={[styles.threadChip, activeThread === item.id && styles.activeChip]}
              onPress={() => setActiveThread(item.id)}
            >
              <Text style={styles.chipText}>{user?.name ?? 'Cliente'}</Text>
            </Pressable>
          );
        }}
      />
      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        style={styles.messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.senderRole === 'store' ? styles.mine : styles.theirs,
            ]}
          >
            <Text style={item.senderRole === 'store' ? styles.mineText : undefined}>
              {item.text}
            </Text>
          </View>
        )}
      />
      <View style={styles.reply}>
        <Pressable
          style={styles.sendBtn}
          onPress={async () => {
            if (activeThread) {
              await sendMessage(activeThread, 'OK, obrigado! Em breve retornamos.');
            }
          }}
        >
          <Text style={styles.sendLabel}>Responder rápido: OK, obrigado!</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '700', padding: espacamento.md },
  threadList: { maxHeight: 48, paddingHorizontal: espacamento.md },
  threadChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: raio.pill,
    backgroundColor: cores.fundoCard,
    borderWidth: 1,
    borderColor: cores.borda,
    marginRight: 8,
  },
  activeChip: { backgroundColor: cores.primary, borderColor: cores.primary },
  chipText: { fontSize: 13, fontWeight: '600' },
  messages: { flex: 1, padding: espacamento.md },
  bubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: '85%',
  },
  mine: { alignSelf: 'flex-end', backgroundColor: cores.primary },
  theirs: { alignSelf: 'flex-start', backgroundColor: cores.fundoCard, borderWidth: 1, borderColor: cores.borda },
  mineText: { color: '#fff' },
  reply: { padding: espacamento.md },
  sendBtn: {
    backgroundColor: cores.primaryLight,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  sendLabel: { color: cores.primaryDark, fontWeight: '700' },
});
