export type InventoryItem = {
  id: string;
  partNumber: string;
  name: string;
  type: 'Raw Material' | 'Finished Product';
  quantity: number;
  location: string;
  lastUpdated: string;
};

export type Order = {
  id: string;
  customerName: string;
  orderDate: string;
  status: 'Placed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  trackingNumber: string;
  fulfillment: number;
};

export type ProductionTask = {
  id: string;
  productName: string;
  quantity: number;
  line: string;
  startTime: string;
  endTime: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Delayed';
};

export type MaintenanceTask = {
  id: string;
  equipment: string;
  task: string;
  scheduledDate: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Overdue';
  assignee: string;
};
