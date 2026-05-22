import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { cores, tipografia } from '../constants/theme';

export default function Perfil() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.avatarWrap}>
        <Image
          source={require('../assets/bola.png')}
          style={styles.avatar}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.nome}>Minha conta</Text>
      <Text style={styles.email}>cliente@bolastore.app</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Atendimento</Text>
        <Text style={styles.linha}>WhatsApp: (11) 99999-0000</Text>
        <Text style={styles.linha}>E-mail: suporte@bolastore.app</Text>
        <Text style={styles.linha}>Horário: seg–sex, 9h às 18h</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Sobre o aplicativo</Text>
        <Text style={styles.linha}>Versão 1.0.0</Text>
        <Text style={styles.linha}>
          Catálogo de bolas esportivas com informações de produto e suporte integrado.
        </Text>
      </View>

      <StatusBar style="light" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 32,
  },
  avatarWrap: {
    alignSelf: 'center',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: cores.fundoElevado,
    borderWidth: 2,
    borderColor: cores.destaque,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
  },
  nome: {
    ...tipografia.titulo,
    textAlign: 'center',
    fontSize: 24,
  },
  email: {
    ...tipografia.corpo,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 28,
  },
  card: {
    backgroundColor: cores.fundoElevado,
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: cores.borda,
    marginBottom: 16,
  },
  cardTitulo: {
    ...tipografia.subtitulo,
    fontSize: 16,
    marginBottom: 12,
  },
  linha: {
    ...tipografia.corpo,
    marginBottom: 8,
  },
});
