import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { cores, tipografia } from '../constants/theme';

const videoSource = 'https://www.pexels.com/download/video/3192198/';

export default function Sobre() {
  const player = useVideoPlayer(videoSource, (p) => {
    p.loop = true;
    p.play();
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={require('../assets/bola.png')}
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="Logotipo Bola Store"
      />

      <Text style={styles.marca}>Bola Store</Text>
      <Text style={styles.tagline}>Equipamentos esportivos de qualidade</Text>

      <View style={styles.bloco}>
        <Text style={styles.paragrafo}>
          Especialistas em bolas para futebol, basquete e vôlei. Selecionamos cada
          item com critérios técnicos de durabilidade, aderência e desempenho em
          campo e quadra.
        </Text>
        <Text style={styles.paragrafo}>
          Navegue pelo catálogo para comparar modelos, especificações e disponibilidade.
          Em caso de dúvidas, nossa equipe está disponível pelos canais indicados na
          aba Perfil.
        </Text>
      </View>

      <Text style={styles.secaoTitulo}>Demonstração em vídeo</Text>
      <VideoView
        player={player}
        style={styles.video}
        allowsPictureInPicture
        contentFit="cover"
      />

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
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 16,
  },
  marca: {
    ...tipografia.titulo,
    textAlign: 'center',
    fontSize: 32,
  },
  tagline: {
    ...tipografia.corpo,
    textAlign: 'center',
    color: cores.destaque,
    marginTop: 6,
    marginBottom: 28,
    fontWeight: '500',
  },
  bloco: {
    backgroundColor: cores.fundoElevado,
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: cores.borda,
    marginBottom: 24,
  },
  paragrafo: {
    ...tipografia.corpo,
    marginBottom: 14,
  },
  secaoTitulo: {
    ...tipografia.subtitulo,
    marginBottom: 12,
    fontSize: 18,
  },
  video: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: cores.fundoElevado,
    overflow: 'hidden',
  },
});
