import { DollarSign, Package, CreditCard, Activity } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProductionEfficiencyChart } from "@/components/dashboard/production-efficiency-chart";
import { MaterialUtilizationChart } from "@/components/dashboard/material-utilization-chart";
import { RecentOrdersTable } from "@/components/dashboard/recent-orders-table";

export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Revenue"
          value="$45,231.89"
          description="+20.1% from last month"
          icon={DollarSign}
        />
        <StatCard 
          title="Orders"
          value="+2350"
          description="+180.1% from last month"
          icon={CreditCard}
        />
        <StatCard 
          title="Units Produced"
          value="12,234"
          description="+19% from last month"
          icon={Package}
        />
        <StatCard 
          title="Efficiency"
          value="94.2%"
          description="+2% from last week"
          icon={Activity}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <ProductionEfficiencyChart />
        </div>
        <div className="lg:col-span-3">
          <MaterialUtilizationChart />
        </div>
      </div>
      <div>
        <RecentOrdersTable />
      </div>
    </>
  );
}
