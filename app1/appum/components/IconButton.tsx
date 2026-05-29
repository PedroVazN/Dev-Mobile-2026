import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, layout, raio } from '../constants/theme';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
  filled?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
};

export function IconButton({
  icon,
  onPress,
  size = 22,
  color = cores.textoSecundario,
  filled,
  style,
  disabled,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={layout.hitSlop}
      style={({ pressed }) => [
        styles.btn,
        filled && styles.filled,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Ionicons name={icon} size={size} color={filled ? '#fff' : color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 44,
    height: 44,
    borderRadius: raio.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundoCard,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  filled: {
    backgroundColor: cores.accent,
    borderColor: cores.accent,
  },
  pressed: { opacity: 0.75, transform: [{ scale: 0.96 }] },
  disabled: { opacity: 0.4 },
});
