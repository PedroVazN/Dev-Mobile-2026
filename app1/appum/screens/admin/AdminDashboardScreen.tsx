import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { MetricCard } from '../../components/MetricCard';
import { useApp } from '../../context/AppContext';
import { cores, espacamento, tipografia } from '../../constants/theme';

export function AdminDashboardScreen() {
  const { state } = useApp();
  const activeStores = state.stores.filter(
    (s) => s.subscriptionStatus === 'active' && s.status === 'approved'
  ).length;
  const consumers = state.users.filter((u) => u.role === 'consumer').length;
  const monthlyRevenue = activeStores * 49.9;

  return (
    <Screen>
      <Text style={styles.title}>Painel Vizzy Sanca</Text>
      <Text style={styles.sub}>São Caetano do Sul — visão geral (MVP demo)</Text>
      <View style={styles.metrics}>
        <MetricCard label="Lojas ativas" value={activeStores} />
        <MetricCard label="Usuários" value={consumers} />
        <MetricCard label="Receita mensal (est.)" value={`R$ ${monthlyRevenue.toFixed(0)}`} />
        <MetricCard label="Promoções" value={state.promotions.length} />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Próximos passos (produção)</Text>
        <Text style={styles.item}>• Integrar Stripe / Mercado Pago / Asaas</Text>
        <Text style={styles.item}>• Backend Node.js + PostgreSQL</Text>
        <Text style={styles.item}>• Push notifications e IA avançada</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...tipografia.titulo },
  sub: { ...tipografia.corpo, marginBottom: espacamento.lg },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  card: {
    marginTop: espacamento.lg,
    backgroundColor: cores.fundoCard,
    padding: espacamento.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  cardTitle: { fontWeight: '700', fontSize: 16, marginBottom: 8 },
  item: { fontSize: 14, color: cores.textoSecundario, marginBottom: 6 },
});
