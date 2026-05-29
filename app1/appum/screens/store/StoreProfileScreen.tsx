import { useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { Screen } from '../../components/Screen';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useApp } from '../../context/AppContext';
import { tipografia, espacamento } from '../../constants/theme';

export function StoreProfileScreen() {
  const { currentUser, state, updateStoreProfile, logout } = useApp();
  const store = state.stores.find((s) => s.id === currentUser?.storeId);
  const [name, setName] = useState(store?.name ?? '');
  const [description, setDescription] = useState(store?.description ?? '');
  const [address, setAddress] = useState(store?.address ?? '');
  const [phone, setPhone] = useState(store?.phone ?? '');
  const [whatsapp, setWhatsapp] = useState(store?.whatsapp ?? '');
  const [hours, setHours] = useState(store?.hours ?? '');

  const save = async () => {
    if (!store) return;
    await updateStoreProfile(store.id, {
      name,
      description,
      address,
      phone,
      whatsapp,
      hours,
    });
    Alert.alert('Perfil atualizado!');
  };

  return (
    <Screen>
      <Text style={styles.title}>Perfil comercial</Text>
      <Input label="Nome da loja" value={name} onChangeText={setName} />
      <Input label="Descrição" value={description} onChangeText={setDescription} multiline />
      <Input label="Endereço" value={address} onChangeText={setAddress} />
      <Input label="Telefone" value={phone} onChangeText={setPhone} />
      <Input label="WhatsApp (com DDI)" value={whatsapp} onChangeText={setWhatsapp} />
      <Input label="Horário" value={hours} onChangeText={setHours} />
      <Button label="Salvar perfil" onPress={save} />
      <Button label="Sair" variant="outline" onPress={() => logout()} style={{ marginTop: 12 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...tipografia.titulo, marginBottom: espacamento.lg },
});
