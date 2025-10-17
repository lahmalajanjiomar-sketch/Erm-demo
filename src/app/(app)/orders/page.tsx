import { orderData } from '@/lib/data';
import { OrdersTable } from '@/components/orders/orders-table';

export default function OrdersPage() {
  const orders = orderData;

  return (
    <div className="flex flex-1 flex-col">
      <OrdersTable orders={orders} />
    </div>
  );
}
