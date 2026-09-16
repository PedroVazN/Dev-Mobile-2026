import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { cores, raio, espacamento, sombra } from '../constants/theme';

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export function Input({ label, error, style, ...props }: Props) {
  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={cores.textoSecundario}
        style={[styles.input, error && styles.inputError, style]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: espacamento.md },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.texto,
    marginBottom: 6,
  },
  input: {
    backgroundColor: cores.fundoCard,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: cores.texto,
    ...sombra.suave,
  },
  inputError: { borderColor: cores.erro },
  error: { color: cores.erro, fontSize: 12, marginTop: 4 },
});
