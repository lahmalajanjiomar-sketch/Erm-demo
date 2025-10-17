import { productionScheduleData } from '@/lib/data';
import { ProductionScheduleTable } from '@/components/production/production-schedule-table';

export default function ProductionPage() {
  const tasks = productionScheduleData;

  return (
    <div className="flex flex-1 flex-col">
      <ProductionScheduleTable tasks={tasks} />
    </div>
  );
}
