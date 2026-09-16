import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { cores, espacamento, tipografia } from '../constants/theme';

type Props = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  style?: ViewStyle;
};

export function PageHeader({ title, subtitle, right, style }: Props) {
  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.textCol}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: espacamento.lg,
    gap: 12,
  },
  textCol: { flex: 1 },
  title: { ...tipografia.titulo, fontSize: 26 },
  subtitle: { ...tipografia.corpo, marginTop: 4 },
});
