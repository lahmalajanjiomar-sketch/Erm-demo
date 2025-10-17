import { inventoryData } from '@/lib/data';
import { InventoryTable } from '@/components/inventory/inventory-table';

export default function InventoryPage() {
  // In a real app, you'd fetch this data from an API
  const items = inventoryData;

  return (
    <div className="flex flex-1 flex-col">
      <InventoryTable items={items} />
    </div>
  );
}
