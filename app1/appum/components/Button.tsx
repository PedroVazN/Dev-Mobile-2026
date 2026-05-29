import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { cores, raio, sombra, tipografia } from '../constants/theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  compact?: boolean;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  loading,
  disabled,
  style,
  compact,
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        compact && styles.compact,
        styles[variant],
        variant === 'primary' && sombra.suave,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'outline' || variant === 'ghost'
              ? cores.primary
              : '#fff'
          }
        />
      ) : (
        <Text
          style={[
            styles.label,
            variant === 'outline' && { color: cores.primary },
            variant === 'secondary' && { color: cores.primaryDark },
            variant === 'ghost' && { color: cores.primary },
            variant === 'danger' && { color: '#fff' },
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: raio.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  compact: { minHeight: 44, paddingHorizontal: 16 },
  primary: { backgroundColor: cores.primary },
  secondary: { backgroundColor: cores.primaryLight },
  outline: {
    backgroundColor: cores.fundoCard,
    borderWidth: 2,
    borderColor: cores.primary,
  },
  danger: { backgroundColor: cores.erro },
  ghost: { backgroundColor: 'transparent' },
  disabled: { opacity: 0.55 },
  pressed: { transform: [{ scale: 0.98 }], opacity: 0.92 },
  label: { ...tipografia.botao },
});
