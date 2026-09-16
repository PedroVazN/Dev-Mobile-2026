import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { cores, espacamento, raio, tipografia } from '../../constants/theme';
import type { AuthStackParamList } from '../../navigation/types';
import type { UserRole } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'RoleSelect'>;

function RoleCard({
  icon,
  title,
  desc,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  desc: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Ionicons name={icon} size={36} color={cores.primary} />
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{desc}</Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color={cores.textoSecundario} />
    </Pressable>
  );
}

export function RoleSelectScreen({ navigation }: Props) {
  const go = (role: UserRole) => {
    if (role === 'admin') {
      navigation.navigate('Login', { role: 'admin' });
      return;
    }
    navigation.navigate('Register', { role });
  };

  return (
    <Screen>
      <Text style={styles.title}>Como você quer usar?</Text>
      <Text style={styles.sub}>Escolha seu perfil para continuar</Text>
      <RoleCard
        icon="person"
        title="Sou usuário"
        desc="Ver promoções, cupons e conversar com lojas"
        onPress={() => go('consumer')}
      />
      <RoleCard
        icon="storefront"
        title="Sou loja"
        desc="Divulgar ofertas e atender clientes da região"
        onPress={() => go('store')}
      />
      <Pressable onPress={() => navigation.navigate('Login', { role: 'admin' })}>
        <Text style={styles.adminLink}>Acesso administrativo</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...tipografia.titulo, marginBottom: 8 },
  sub: { ...tipografia.corpo, marginBottom: espacamento.lg },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.fundoCard,
    borderRadius: raio.lg,
    padding: espacamento.md,
    marginBottom: espacamento.md,
    borderWidth: 1,
    borderColor: cores.borda,
    gap: 14,
  },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: cores.texto },
  cardDesc: { fontSize: 13, color: cores.textoSecundario, marginTop: 4 },
  adminLink: {
    textAlign: 'center',
    color: cores.primary,
    fontWeight: '600',
    marginTop: espacamento.lg,
  },
});
