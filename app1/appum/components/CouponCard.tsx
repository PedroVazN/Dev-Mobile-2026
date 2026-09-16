import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Coupon, Store } from '../types';
import { cores, raio, espacamento, sombra, tipografia } from '../constants/theme';
import { Badge } from './Badge';
import { Button } from './Button';
import { useLockedAction } from '../hooks/useLockedAction';

type Props = {
  coupon: Coupon;
  store?: Store;
  redeemed?: boolean;
  onRedeem?: () => Promise<{ ok: boolean; error?: string }>;
};

export function CouponCard({ coupon, store, redeemed, onRedeem }: Props) {
  const expired = new Date(coupon.validUntil) < new Date();
  const canRedeem = Boolean(onRedeem) && !redeemed && !expired;

  const { run: handleRedeem, loading } = useLockedAction(async () => {
    if (onRedeem) await onRedeem();
  });

  return (
    <View style={[styles.card, redeemed && styles.cardRedeemed]}>
      <View style={styles.discountWrap}>
        <Text style={styles.discount}>{coupon.discountPercent}%</Text>
        <Text style={styles.off}>OFF</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Badge
            label={expired ? 'Expirado' : redeemed ? 'Resgatado' : 'Disponível'}
            tone={expired ? 'danger' : redeemed ? 'neutral' : 'success'}
          />
        </View>
        <Text style={styles.title}>{coupon.title}</Text>
        <Text style={styles.storeName}>{store?.name}</Text>
        <View style={styles.codeBox}>
          <Text style={styles.codeLabel}>Código</Text>
          <Text style={styles.code}>{coupon.code}</Text>
        </View>
        <Text style={styles.valid}>
          Válido até {new Date(coupon.validUntil).toLocaleDateString('pt-BR')}
        </Text>

        {redeemed ? (
          <View style={styles.successRow}>
            <Ionicons name="checkmark-circle" size={20} color={cores.sucesso} />
            <Text style={styles.successText}>Cupom na sua carteira</Text>
          </View>
        ) : canRedeem ? (
          <Button
            label={loading ? 'Resgatando...' : 'Resgatar cupom'}
            onPress={handleRedeem}
            loading={loading}
            style={styles.btn}
            compact
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: cores.fundoCard,
    borderRadius: raio.lg,
    marginBottom: espacamento.md,
    borderWidth: 1,
    borderColor: cores.borda,
    overflow: 'hidden',
    ...sombra.card,
  },
  cardRedeemed: {
    borderColor: cores.sucesso,
    backgroundColor: '#FAFFFC',
  },
  discountWrap: {
    width: 88,
    backgroundColor: cores.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: espacamento.md,
  },
  discount: { fontSize: 28, fontWeight: '900', color: '#fff' },
  off: { fontSize: 12, fontWeight: '800', color: 'rgba(255,255,255,0.85)' },
  content: { flex: 1, padding: espacamento.md },
  row: { marginBottom: 6 },
  title: { ...tipografia.subtitulo, fontSize: 16, marginBottom: 2 },
  storeName: { fontSize: 13, color: cores.textoSecundario, marginBottom: 8 },
  codeBox: {
    backgroundColor: cores.fundo,
    borderRadius: raio.sm,
    padding: 10,
    marginBottom: 6,
  },
  codeLabel: { fontSize: 10, fontWeight: '600', color: cores.textoSecundario },
  code: {
    fontSize: 16,
    fontWeight: '800',
    color: cores.texto,
    letterSpacing: 2,
    marginTop: 2,
  },
  valid: { fontSize: 11, color: cores.textoSecundario },
  btn: { marginTop: 10 },
  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    backgroundColor: cores.sucessoLight,
    padding: 10,
    borderRadius: raio.sm,
  },
  successText: { fontSize: 13, fontWeight: '600', color: '#047857' },
});
