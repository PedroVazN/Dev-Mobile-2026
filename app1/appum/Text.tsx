import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    texto: {
        color: 'blue'
    }
});


export default function Texto() {
    return (
        <Text style={styles.texto}>
            Este é um texto estilizado usando o componente Text do React Native.
        </Text>
    );
}   