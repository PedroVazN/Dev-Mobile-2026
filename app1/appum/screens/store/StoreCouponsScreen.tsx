import { useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { Screen } from '../../components/Screen';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { CouponCard } from '../../components/CouponCard';
import { useApp } from '../../context/AppContext';
import { tipografia, espacamento } from '../../constants/theme';

export function StoreCouponsScreen() {
  const { state, currentUser, createCoupon } = useApp();
  const storeId = currentUser?.storeId;
  const coupons = state.coupons.filter((c) => c.storeId === storeId);
  const store = state.stores.find((s) => s.id === storeId);

  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [discount, setDiscount] = useState('10');
  const [days, setDays] = useState('30');

  const create = async () => {
    if (!code || !title) {
      Alert.alert('Informe código e título.');
      return;
    }
    const validUntil = new Date(
      Date.now() + Number(days) * 24 * 60 * 60 * 1000
    ).toISOString();
    await createCoupon({
      code: code.toUpperCase(),
      title,
      description: 'Cupom criado pela loja',
      discountPercent: Number(discount) || 10,
      validFrom: new Date().toISOString(),
      validUntil,
      maxRedemptions: 100,
    });
    Alert.alert('Cupom criado!');
    setCode('');
    setTitle('');
  };

  return (
    <Screen>
      <Text style={styles.title}>Cupons da loja</Text>
      <Input label="Código" value={code} onChangeText={setCode} autoCapitalize="characters" />
      <Input label="Título" value={title} onChangeText={setTitle} />
      <Input label="% desconto" value={discount} onChangeText={setDiscount} keyboardType="number-pad" />
      <Input label="Validade (dias)" value={days} onChangeText={setDays} keyboardType="number-pad" />
      <Button label="Criar cupom" onPress={create} style={{ marginBottom: espacamento.lg }} />
      {coupons.map((c) => (
        <CouponCard key={c.id} coupon={c} store={store} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...tipografia.titulo, marginBottom: espacamento.md },
});
