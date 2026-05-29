import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { resolveImageSource } from '../constants/images';
import { cores, raio } from '../constants/theme';

type Props = {
  /** Chave local (`coffee`) ou URL remota. */
  uri?: string;
  style?: ViewStyle;
  aspectRatio?: number;
};

export function RemoteImage({ uri, style, aspectRatio = 16 / 9 }: Props) {
  const source = resolveImageSource(uri);

  return (
    <View style={[styles.wrap, { aspectRatio }, style]}>
      <Image source={source} style={styles.image} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    borderRadius: raio.md,
    overflow: 'hidden',
    backgroundColor: cores.borda,
  },
  image: { width: '100%', height: '100%' },
});
