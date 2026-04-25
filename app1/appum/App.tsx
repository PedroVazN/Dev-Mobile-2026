import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, Text, ScrollView, Image, View, Pressable } from 'react-native';

import TelaProduto from './telas/Produtos';
import { listaProdutos } from './telas/mocks/listaProdutos';

const videoSource =
  'https://www.pexels.com/download/video/3192198/';

function AppContent() {
  const [tela, setTela] = useState<'inicio' | 'produtos'>('inicio');

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  if (tela === 'produtos') {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={() => setTela('inicio')}
          style={styles.telaProdutosVoltar}
        >
          <Text style={styles.telaProdutosVoltarTexto}>Voltar</Text>
        </Pressable>
        <TelaProduto itens={listaProdutos.itens} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={require('./assets/bola.png')} style={styles.bola} />

      <Text style={styles.text}>Recuperamo a bola.</Text>

      <Text style={styles.textBola}>
        A bola havia sido perdida porem recuperamos a bola com excelencia,
        {'\n'} {'\n'}
        e agora ela esta conosco novamente
      </Text>

      <StatusBar style="auto" />

      <VideoView
        style={styles.video}
        player={player}
        allowsPictureInPicture
      />

      <Pressable
        onPress={() => setTela('produtos')}
        style={styles.btnProdutos}
      >
        <Text style={styles.btnProdutosTexto}>Ver produtos</Text>
      </Pressable>
    </ScrollView>
  );
}

export default function App() {
  return <AppContent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    marginTop: 60,
  },
  video: {
    width: 350,
    height: 275,
    alignSelf: 'center',
    marginTop: 20,
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 40,
    color: '#fff',
    paddingHorizontal: 20,
  },
  textBola: {
    fontFamily: 'Arial',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    color: '#fff',
    paddingHorizontal: 20,
  },
  bola: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  btnProdutos: {
    marginVertical: 24,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
  },
  btnProdutosTexto: {
    color: '#8cb4ff',
    fontSize: 16,
  },
  telaProdutosVoltar: {
    padding: 12,
    paddingTop: 48,
  },
  telaProdutosVoltarTexto: {
    color: '#8cb4ff',
    fontSize: 16,
  },
});