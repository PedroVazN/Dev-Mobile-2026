import { useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useApp } from '../../context/AppContext';
import { tipografia, espacamento } from '../../constants/theme';
import type { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const hints: Record<string, string> = {
  consumer: 'ana@email.com / 123456',
  store: 'loja@padaria.com / 123456',
  admin: 'admin@vizzy.com / admin123',
};

export function LoginScreen({ route }: Props) {
  const { login } = useApp();
  const role = route.params?.role ?? 'consumer';
  const [email, setEmail] = useState(
    role === 'admin' ? 'admin@vizzy.com' : role === 'store' ? 'loja@padaria.com' : 'ana@email.com'
  );
  const [password, setPassword] = useState(role === 'admin' ? 'admin123' : '123456');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.ok) Alert.alert('Erro', result.error);
  };

  return (
    <Screen>
      <Text style={styles.title}>Entrar</Text>
      <Text style={styles.hint}>Demo: {hints[role] ?? hints.consumer}</Text>
      <Input
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button label="Entrar" onPress={handleLogin} loading={loading} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...tipografia.titulo, marginBottom: 8 },
  hint: { ...tipografia.corpo, marginBottom: espacamento.lg, fontSize: 13 },
});
