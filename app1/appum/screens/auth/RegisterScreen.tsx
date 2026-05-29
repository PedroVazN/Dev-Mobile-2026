import { useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useApp } from '../../context/AppContext';
import { tipografia, espacamento } from '../../constants/theme';
import type { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ route }: Props) {
  const { register, state } = useApp();
  const isStore = route.params.role === 'store';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Preencha nome, e-mail e senha.');
      return;
    }
    setLoading(true);
    const result = await register({
      name,
      email,
      password,
      phone,
      role: route.params.role,
      storeName: isStore ? storeName : undefined,
      address: isStore ? address : undefined,
      categoryId: state.categories[0]?.id,
    });
    setLoading(false);
    if (!result.ok) Alert.alert('Erro', result.error);
    else if (isStore) {
      Alert.alert(
        'Cadastro enviado',
        'Sua loja aguarda aprovação do administrador e ativação da assinatura.'
      );
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>{isStore ? 'Cadastrar loja' : 'Criar conta'}</Text>
      <Input label="Nome" value={name} onChangeText={setName} />
      <Input
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input label="Telefone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      {isStore ? (
        <>
          <Input label="Nome da loja" value={storeName} onChangeText={setStoreName} />
          <Input label="Endereço" value={address} onChangeText={setAddress} />
        </>
      ) : null}
      <Button label="Cadastrar" onPress={handleRegister} loading={loading} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...tipografia.titulo, marginBottom: espacamento.lg },
});
