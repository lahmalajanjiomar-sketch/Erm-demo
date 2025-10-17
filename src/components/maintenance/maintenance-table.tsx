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
  import type { MaintenanceTask } from '@/lib/types';
  
  type MaintenanceTableProps = {
    tasks: MaintenanceTask[];
  };

  const getStatusVariant = (status: MaintenanceTask['status']) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Overdue':
        return 'destructive';
      case 'Scheduled':
        return 'outline';
      default:
        return 'default';
    }
  };
  
  export function MaintenanceTable({ tasks }: MaintenanceTableProps) {
    return (
      <Card className="flex flex-col flex-1">
        <CardHeader>
          <CardTitle>Maintenance Schedule</CardTitle>
          <CardDescription>
            Schedule and track maintenance for factory equipment.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-1">
          <div className="rounded-md border flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Scheduled Date</TableHead>
                  <TableHead>Assignee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div className="font-medium">{task.equipment}</div>
                      <div className="text-sm text-muted-foreground sm:hidden">{task.task}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{new Date(task.scheduledDate).toLocaleDateString()}</TableCell>
                    <TableCell>{task.assignee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }
  