"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const data = [
  { name: "Mon", efficiency: 88 },
  { name: "Tue", efficiency: 92 },
  { name: "Wed", efficiency: 95 },
  { name: "Thu", efficiency: 91 },
  { name: "Fri", efficiency: 93 },
  { name: "Sat", efficiency: 96 },
  { name: "Sun", efficiency: 94 },
];

export function ProductionEfficiencyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Production Efficiency</CardTitle>
        <CardDescription>Overall Equipment Effectiveness (OEE) for the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
               <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `${value}%`}
                domain={[80, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: 'var(--radius)'
                }}
              />
              <Line type="monotone" dataKey="efficiency" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
