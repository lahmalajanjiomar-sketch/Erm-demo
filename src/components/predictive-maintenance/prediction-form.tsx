'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, AlertTriangle, CheckCircle, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import type { PredictiveMaintenanceOutput } from '@/ai/flows/predictive-maintenance-alerts';

const formSchema = z.object({
  machineId: z.string().min(1, 'Machine ID is required.'),
  sensorData: z.string().min(10, 'Sensor data is required.').refine(
    (val) => {
      try {
        JSON.parse(val);
        return true;
      } catch (e) {
        return false;
      }
    },
    { message: 'Sensor data must be a valid JSON string.' }
  ),
});

type PredictionFormProps = {
  onPredict: (data: z.infer<typeof formSchema>) => Promise<PredictiveMaintenanceOutput | null>;
};

export function PredictionForm({ onPredict }: PredictionFormProps) {
  const [prediction, setPrediction] = useState<PredictiveMaintenanceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      machineId: 'CNC-007',
      sensorData: JSON.stringify({
        temperature: 95.5,
        vibration: 2.1,
        runtimeHours: 4512,
        voltage: 221,
      }, null, 2),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await onPredict(values);
      setPrediction(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get prediction from the AI model.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
      default:
        return 'outline';
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Analyze Sensor Data</CardTitle>
          <CardDescription>
            Input machine ID and sensor data to predict potential failures.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="machineId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Machine ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., CNC-007" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sensorData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sensor Data (JSON)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='{ "temperature": 95.5, "vibration": 2.1 }'
                        className="min-h-[150px] font-code"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide sensor data as a JSON object.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Predict Failure
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Prediction Result</CardTitle>
          <CardDescription>The AI's analysis will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4">Running analysis...</p>
            </div>
          )}
          {!isLoading && !prediction && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Wand2 className="h-12 w-12" />
              <p className="mt-4 text-center">Your prediction result will be shown here after analysis.</p>
            </div>
          )}
          {prediction && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg flex items-center">
                  {prediction.failurePrediction ? (
                     <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
                  ) : (
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  )}
                  {prediction.failurePrediction ? 'Failure Predicted' : 'No Failure Predicted'}
                </h3>
                <p className="text-muted-foreground">
                    Confidence: {(prediction.confidence * 100).toFixed(1)}%
                </p>
              </div>

              {prediction.failurePrediction && (
                 <>
                    <div>
                        <h4 className="font-medium">Urgency</h4>
                        <Badge variant={getUrgencyBadge(prediction.urgency)}>{prediction.urgency}</Badge>
                    </div>
                    <div>
                        <h4 className="font-medium">Predicted Failure Type</h4>
                        <p className="text-muted-foreground">{prediction.failureType}</p>
                    </div>
                    <div>
                        <h4 className="font-medium">Recommended Actions</h4>
                        <p className="text-muted-foreground bg-secondary/50 p-3 rounded-md border">{prediction.recommendedActions}</p>
                    </div>
                 </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
