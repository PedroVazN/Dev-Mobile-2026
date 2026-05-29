import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { CITY } from '../../constants/city';
import { CityBadge } from '../../components/CityBadge';
import { cores, espacamento, raio, sombra } from '../../constants/theme';
import type { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <Screen>
      <View style={styles.hero}>
        <View style={styles.logoRing}>
          <View style={styles.logo}>
            <Ionicons name="flash" size={44} color={cores.primary} />
          </View>
        </View>
        <CityBadge />
        <Text style={styles.brand}>Vizzy</Text>
        <Text style={styles.tagline}>{CITY.tagline}</Text>
        <Text style={styles.region}>
          Focado em {CITY.name} — {CITY.nickname}, no {CITY.region}
        </Text>
        <View style={styles.features}>
          <Feature icon="pricetag" text="Ofertas nos bairros de Sanca" />
          <Feature icon="ticket" text="Cupons de comércio local" />
          <Feature icon="chatbubble-ellipses" text="Chat com lojas do ABC" />
        </View>
      </View>
      <Button label="Começar" onPress={() => navigation.navigate('RoleSelect')} />
      <Button
        label="Já tenho conta"
        variant="outline"
        onPress={() => navigation.navigate('Login', {})}
        style={styles.secondary}
      />
    </Screen>
  );
}

function Feature({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  return (
    <View style={styles.feature}>
      <Ionicons name={icon} size={18} color={cores.primary} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', marginTop: espacamento.lg, marginBottom: espacamento.xl },
  logoRing: {
    padding: 6,
    borderRadius: 60,
    backgroundColor: cores.primaryLight,
    marginBottom: espacamento.lg,
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: cores.fundoCard,
    alignItems: 'center',
    justifyContent: 'center',
    ...sombra.suave,
  },
  brand: {
    fontSize: 36,
    fontWeight: '900',
    color: cores.texto,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    lineHeight: 22,
    color: cores.texto,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: espacamento.sm,
    paddingHorizontal: espacamento.sm,
  },
  region: {
    fontSize: 14,
    color: cores.textoSecundario,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: espacamento.md,
  },
  features: {
    width: '100%',
    marginTop: espacamento.lg,
    gap: 10,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: cores.fundoCard,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: raio.md,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  featureText: { fontSize: 14, fontWeight: '600', color: cores.texto },
  secondary: { marginTop: espacamento.sm },
});
