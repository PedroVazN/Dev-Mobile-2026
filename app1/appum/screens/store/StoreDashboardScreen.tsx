import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { MetricCard } from '../../components/MetricCard';
import { Badge } from '../../components/Badge';
import { useApp } from '../../context/AppContext';
import { cores, espacamento, tipografia } from '../../constants/theme';

const subLabels = {
  active: { label: 'Ativa', tone: 'success' as const },
  expired: { label: 'Vencida', tone: 'danger' as const },
  cancelled: { label: 'Cancelada', tone: 'neutral' as const },
  pending: { label: 'Pendente', tone: 'warning' as const },
};

export function StoreDashboardScreen() {
  const { currentUser, state } = useApp();
  const store = state.stores.find((s) => s.id === currentUser?.storeId);
  if (!store) {
    return (
      <Screen>
        <Text>Loja não vinculada.</Text>
      </Screen>
    );
  }

  const sub = subLabels[store.subscriptionStatus];

  return (
    <Screen>
      <Text style={styles.title}>Painel da loja</Text>
      <Text style={styles.name}>{store.name}</Text>
      <Badge label={`Assinatura: ${sub.label}`} tone={sub.tone} />
      {store.status === 'pending' ? (
        <Text style={styles.warn}>
          Aguardando aprovação do administrador para aparecer no app.
        </Text>
      ) : null}
      {store.subscriptionExpiresAt && store.subscriptionStatus === 'active' ? (
        <Text style={styles.meta}>
          Válida até {new Date(store.subscriptionExpiresAt).toLocaleDateString('pt-BR')}
        </Text>
      ) : null}

      <Text style={styles.section}>Métricas (últimos 30 dias — demo)</Text>
      <View style={styles.metrics}>
        <MetricCard label="Visitas no perfil" value={store.metrics.profileViews} />
        <MetricCard label="Cliques" value={store.metrics.clicks} />
        <MetricCard label="Cupons resgatados" value={store.metrics.couponsRedeemed} />
        <MetricCard label="Mensagens" value={store.metrics.messagesReceived} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...tipografia.titulo },
  name: { ...tipografia.subtitulo, marginVertical: 8 },
  warn: { color: cores.alerta, marginTop: 12, fontSize: 14 },
  meta: { color: cores.textoSecundario, marginTop: 8 },
  section: { ...tipografia.subtitulo, marginTop: espacamento.lg, marginBottom: 8 },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
