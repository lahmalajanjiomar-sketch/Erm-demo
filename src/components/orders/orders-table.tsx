'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search } from 'lucide-react';
import type { Order } from '@/lib/types';

type OrdersTableProps = {
  orders: Order[];
};

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

export function OrdersTable({ orders }: OrdersTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader>
        <CardTitle>Customer Orders</CardTitle>
        <CardDescription>
          Manage orders from placement to fulfillment.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="mb-4">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by customer or order ID..."
                    className="w-full pl-8 sm:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <div className="rounded-md border flex-1">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fulfillment</TableHead>
                <TableHead className="text-right">Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>
                        <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <Progress value={order.fulfillment} aria-label={`${order.fulfillment}% fulfilled`} className="w-[100px]" />
                            <span className="text-muted-foreground text-sm">{order.fulfillment}%</span>
                        </div>
                    </TableCell>
                    <TableCell className="text-right">${order.total.toLocaleString()}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
