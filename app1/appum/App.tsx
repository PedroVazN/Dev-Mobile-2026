import { StatusBar } from 'expo-status-bar';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, Text, ScrollView, Image } from 'react-native';

const videoSource =
  'https://www.pexels.com/download/video/3192198/';

export default function App() {

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  return (
    <ScrollView style={styles.container}>
      <Image source={require('./assets/bola.png')} style={styles.bola} />

      <Text style={styles.text}>Recuperamo a bola.</Text>

      <Text style={styles.textBola}>
        A bola havia sido perdida porem recuperamos a bola com excelencia,
        {'\n'} {'\n'}
        e agora ela esta conosco novamente.
      </Text>

      <StatusBar style="auto" />

      <VideoView
        style={styles.video}
        player={player}
        allowsPictureInPicture
      />
    </ScrollView>
  );
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
});