import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, espacamento, tipografia } from '../constants/theme';

type Props = { icon?: keyof typeof Ionicons.glyphMap; title: string; subtitle?: string };

export function EmptyState({
  icon = 'file-tray-outline',
  title,
  subtitle,
}: Props) {
  return (
    <View style={styles.wrap}>
      <Ionicons name={icon} size={48} color={cores.textoSecundario} />
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingVertical: espacamento.xl,
    paddingHorizontal: espacamento.lg,
  },
  title: { ...tipografia.subtitulo, marginTop: espacamento.md, textAlign: 'center' },
  sub: { ...tipografia.corpo, textAlign: 'center', marginTop: 8 },
});
