import { useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { Screen } from '../../components/Screen';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useApp } from '../../context/AppContext';
import { tipografia, espacamento } from '../../constants/theme';

export function StorePublishScreen() {
  const { createPromotion, currentUser, state } = useApp();
  const store = state.stores.find((s) => s.id === currentUser?.storeId);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [actionLabel, setActionLabel] = useState('Ver oferta');
  const [days, setDays] = useState('7');
  const [loading, setLoading] = useState(false);

  const publish = async () => {
    if (!title || !description) {
      Alert.alert('Preencha título e descrição.');
      return;
    }
    if (store?.subscriptionStatus !== 'active' || store.status !== 'approved') {
      Alert.alert('Assinatura inativa ou loja não aprovada.');
      return;
    }
    setLoading(true);
    const expiresAt = new Date(
      Date.now() + Number(days || 7) * 24 * 60 * 60 * 1000
    ).toISOString();
    await createPromotion({ title, description, actionLabel, expiresAt });
    setLoading(false);
    Alert.alert('Publicado!', 'Sua promoção já aparece no feed.');
    setTitle('');
    setDescription('');
  };

  return (
    <Screen>
      <Text style={styles.title}>Publicar promoção</Text>
      <Input label="Título" value={title} onChangeText={setTitle} />
      <Input
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
      />
      <Input label="Texto do botão" value={actionLabel} onChangeText={setActionLabel} />
      <Input
        label="Validade (dias)"
        value={days}
        onChangeText={setDays}
        keyboardType="number-pad"
      />
      <Button label="Publicar agora" onPress={publish} loading={loading} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...tipografia.titulo, marginBottom: espacamento.lg },
});
