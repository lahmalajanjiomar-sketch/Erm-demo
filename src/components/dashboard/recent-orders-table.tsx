import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { orderData } from "@/lib/data";
import type { Order } from "@/lib/types";

const getStatusVariant = (status: Order['status']) => {
  switch (status) {
    case 'Delivered':
      return 'default';
    case 'Processing':
      return 'secondary';
    case 'Shipped':
      return 'secondary';
    case 'Cancelled':
      return 'destructive';
    case 'Placed':
      return 'outline';
    default:
      return 'default';
  }
};

export function RecentOrdersTable() {
  const recentOrders = orderData.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>A list of the most recent customer orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-medium">{order.customerName}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">{order.id}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                   <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{order.orderDate}</TableCell>
                <TableCell className="text-right">
                  ${order.total.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
