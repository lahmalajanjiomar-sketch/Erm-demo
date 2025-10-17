import type { InventoryItem, Order, ProductionTask, MaintenanceTask } from './types';

export const inventoryData: InventoryItem[] = [
  { id: '1', partNumber: 'RM-001', name: 'Steel Coil', type: 'Raw Material', quantity: 50, location: 'Aisle 1, Rack 2', lastUpdated: '2023-10-27T10:00:00Z' },
  { id: '2', partNumber: 'RM-002', name: 'Plastic Pellets', type: 'Raw Material', quantity: 1000, location: 'Aisle 2, Bin 5', lastUpdated: '2023-10-27T11:30:00Z' },
  { id: '3', partNumber: 'FP-WID-01', name: 'Widget A', type: 'Finished Product', quantity: 500, location: 'Shipping Area', lastUpdated: '2023-10-26T15:00:00Z' },
  { id: '4', partNumber: 'FP-WID-02', name: 'Widget B', type: 'Finished Product', quantity: 320, location: 'Shipping Area', lastUpdated: '2023-10-27T09:20:00Z' },
  { id: '5', partNumber: 'RM-003', name: 'Aluminum Ingots', type: 'Raw Material', quantity: 250, location: 'Aisle 1, Rack 5', lastUpdated: '2023-10-25T14:10:00Z' },
  { id: '6', partNumber: 'RM-004', name: 'Rubber Gaskets', type: 'Raw Material', quantity: 10000, location: 'Aisle 3, Bin 1', lastUpdated: '2023-10-27T13:45:00Z' },
  { id: '7', partNumber: 'FP-GAD-01', name: 'Gadget Pro', type: 'Finished Product', quantity: 150, location: 'QC Hold', lastUpdated: '2023-10-27T12:00:00Z' },
];

export const orderData: Order[] = [
  { id: 'ORD-001', customerName: 'Global Corp', orderDate: '2023-10-25', status: 'Shipped', total: 15000, trackingNumber: '1Z999AA10123456784', fulfillment: 100 },
  { id: 'ORD-002', customerName: 'Innovate LLC', orderDate: '2023-10-26', status: 'Processing', total: 8200, trackingNumber: 'N/A', fulfillment: 45 },
  { id: 'ORD-003', customerName: 'Mega Holdings', orderDate: '2023-10-27', status: 'Placed', total: 25000, trackingNumber: 'N/A', fulfillment: 0 },
  { id: 'ORD-004', customerName: 'Alpha Industries', orderDate: '2023-10-22', status: 'Delivered', total: 5600, trackingNumber: '1Z999AA10123456785', fulfillment: 100 },
  { id: 'ORD-005', customerName: 'Beta Solutions', orderDate: '2023-10-27', status: 'Processing', total: 12500, trackingNumber: 'N/A', fulfillment: 60 },
  { id: 'ORD-006', customerName: 'Zeta Enterprises', orderDate: '2023-10-26', status: 'Cancelled', total: 9900, trackingNumber: 'N/A', fulfillment: 0 },
];

export const productionScheduleData: ProductionTask[] = [
  { id: 'P-001', productName: 'Widget A', quantity: 2000, line: 'Line 1', startTime: '2023-10-28T08:00:00Z', endTime: '2023-10-28T16:00:00Z', status: 'In Progress' },
  { id: 'P-002', productName: 'Widget B', quantity: 1500, line: 'Line 2', startTime: '2023-10-28T09:00:00Z', endTime: '2023-10-28T17:00:00Z', status: 'Scheduled' },
  { id: 'P-003', productName: 'Gadget Pro', quantity: 500, line: 'Line 3', startTime: '2023-10-29T08:00:00Z', endTime: '2023-10-29T12:00:00Z', status: 'Scheduled' },
  { id: 'P-004', productName: 'Widget A', quantity: 1000, line: 'Line 1', startTime: '2023-10-27T08:00:00Z', endTime: '2023-10-27T12:00:00Z', status: 'Completed' },
  { id: 'P-005', productName: 'Special Part X', quantity: 50, line: 'Custom Line', startTime: '2023-10-27T10:00:00Z', endTime: '2023-10-27T11:00:00Z', status: 'Delayed' },
];

export const maintenanceTaskData: MaintenanceTask[] = [
  { id: 'M-001', equipment: 'CNC Machine 01', task: 'Quarterly Lubrication', scheduledDate: '2023-11-05', status: 'Scheduled', assignee: 'John D.' },
  { id: 'M-002', equipment: 'Stamping Press A', task: 'Die Inspection', scheduledDate: '2023-11-02', status: 'Scheduled', assignee: 'Jane S.' },
  { id: 'M-003', equipment: 'Conveyor Belt 3', task: 'Motor Replacement', scheduledDate: '2023-10-28', status: 'In Progress', assignee: 'Mike R.' },
  { id: 'M-004', equipment: 'Welding Robot 2', task: 'Tip and Nozzle Cleaning', scheduledDate: '2023-10-25', status: 'Overdue', assignee: 'Tech Team' },
  { id: 'M-005', equipment: 'Packaging Line 1', task: 'Sensor Calibration', scheduledDate: '2023-10-27', status: 'Completed', assignee: 'Sarah L.' },
];
