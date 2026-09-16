import { Screen } from '../../components/Screen';
import { CouponCard } from '../../components/CouponCard';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/PageHeader';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';

export function CouponsScreen() {
  const { state, getVisibleStores, redeemCoupon, hasRedeemedCoupon } = useApp();
  const { showToast } = useToast();
  const visibleStoreIds = new Set(getVisibleStores().map((s) => s.id));
  const coupons = state.coupons.filter((c) => visibleStoreIds.has(c.storeId));

  return (
    <Screen>
      <PageHeader
        title="Cupons"
        subtitle="Resgate e mostre o código na loja"
      />
      {coupons.length === 0 ? (
        <EmptyState
          icon="ticket-outline"
          title="Nenhum cupom disponível"
          subtitle="Volte em breve para novas ofertas da região"
        />
      ) : (
        coupons.map((coupon) => {
          const store = state.stores.find((s) => s.id === coupon.storeId);
          return (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              store={store}
              redeemed={hasRedeemedCoupon(coupon.id)}
              onRedeem={async () => {
                const result = await redeemCoupon(coupon.id);
                if (result.ok) {
                  showToast('Cupom resgatado! Mostre o código na loja.', 'success');
                } else {
                  showToast(result.error ?? 'Não foi possível resgatar.', 'error');
                }
                return result;
              }}
            />
          );
        })
      )}
    </Screen>
  );
}
