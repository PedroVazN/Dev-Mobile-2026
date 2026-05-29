import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useApp } from '../../context/AppContext';
import { cores, espacamento, raio } from '../../constants/theme';
import type { ConsumerStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<ConsumerStackParamList, 'ChatRoom'>;

export function ChatRoomScreen({ route }: Props) {
  const { threadId } = route.params;
  const { state, currentUser, sendMessage } = useApp();
  const [text, setText] = useState('');

  const messages = state.messages
    .filter((m) => m.threadId === threadId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage(threadId, text);
    setText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const mine = item.senderId === currentUser?.id;
          return (
            <View style={[styles.bubble, mine ? styles.mine : styles.theirs]}>
              <Text style={[styles.msg, mine && styles.msgMine]}>{item.text}</Text>
            </View>
          );
        }}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Digite sua mensagem..."
          placeholderTextColor={cores.textoSecundario}
        />
        <Pressable style={styles.send} onPress={handleSend}>
          <Text style={styles.sendText}>Enviar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: cores.fundo },
  list: { padding: espacamento.md, paddingBottom: 8 },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: raio.lg,
    marginBottom: 8,
  },
  mine: { alignSelf: 'flex-end', backgroundColor: cores.primary },
  theirs: { alignSelf: 'flex-start', backgroundColor: cores.fundoCard, borderWidth: 1, borderColor: cores.borda },
  msg: { color: cores.texto },
  msgMine: { color: '#fff' },
  inputRow: {
    flexDirection: 'row',
    padding: espacamento.md,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
    backgroundColor: cores.fundoCard,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: cores.texto,
  },
  send: {
    backgroundColor: cores.primary,
    borderRadius: raio.md,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendText: { color: '#fff', fontWeight: '700' },
});
