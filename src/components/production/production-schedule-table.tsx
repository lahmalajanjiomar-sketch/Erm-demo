import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
  import { Badge } from '@/components/ui/badge';
  import type { ProductionTask } from '@/lib/types';
  
  type ProductionScheduleTableProps = {
    tasks: ProductionTask[];
  };

  const getStatusVariant = (status: ProductionTask['status']) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Delayed':
        return 'destructive';
      case 'Scheduled':
        return 'outline';
      default:
        return 'default';
    }
  };
  
  export function ProductionScheduleTable({ tasks }: ProductionScheduleTableProps) {
    return (
      <Card className="flex flex-col flex-1">
        <CardHeader>
          <CardTitle>Production Schedule</CardTitle>
          <CardDescription>
            View and manage upcoming production tasks.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-1">
          <div className="rounded-md border flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Start Time</TableHead>
                  <TableHead className="hidden md:table-cell">End Time</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div className="font-medium">{task.productName}</div>
                      <div className="text-sm text-muted-foreground sm:hidden">{task.status}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{new Date(task.startTime).toLocaleString()}</TableCell>
                    <TableCell className="hidden md:table-cell">{new Date(task.endTime).toLocaleString()}</TableCell>
                    <TableCell className="text-right">{task.quantity.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }
  