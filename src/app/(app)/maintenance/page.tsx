import { maintenanceTaskData } from '@/lib/data';
import { MaintenanceTable } from '@/components/maintenance/maintenance-table';

export default function MaintenancePage() {
  const tasks = maintenanceTaskData;

  return (
    <div className="flex flex-1 flex-col">
      <MaintenanceTable tasks={tasks} />
    </div>
  );
}
