'use server';
/**
 * @fileOverview Analyzes machine sensor data to predict potential equipment failures and alerts maintenance managers.
 *
 * - predictFailure - A function that analyzes sensor data and predicts potential failures.
 * - PredictiveMaintenanceInput - The input type for the predictFailure function.
 * - PredictiveMaintenanceOutput - The return type for the predictFailure function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveMaintenanceInputSchema = z.object({
  machineId: z.string().describe('The ID of the machine being monitored.'),
  sensorData: z.string().describe('The sensor data from the machine, as a JSON string.'),
});
export type PredictiveMaintenanceInput = z.infer<typeof PredictiveMaintenanceInputSchema>;

const PredictiveMaintenanceOutputSchema = z.object({
  failurePrediction: z.boolean().describe('Whether a failure is predicted.'),
  failureType: z.string().describe('The type of failure predicted.'),
  urgency: z.string().describe('The urgency of the predicted failure (e.g., low, medium, high).'),
  confidence: z.number().describe('The confidence level of the prediction (0-1).'),
  recommendedActions: z.string().describe('Recommended actions to take to prevent the failure.'),
});
export type PredictiveMaintenanceOutput = z.infer<typeof PredictiveMaintenanceOutputSchema>;

export async function predictFailure(input: PredictiveMaintenanceInput): Promise<PredictiveMaintenanceOutput> {
  return predictFailureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictFailurePrompt',
  input: {schema: PredictiveMaintenanceInputSchema},
  output: {schema: PredictiveMaintenanceOutputSchema},
  prompt: `You are an AI assistant specializing in predictive maintenance for factory equipment.

You will receive sensor data from a machine and predict potential failures.
Based on the sensor data, determine if a failure is likely, the type of failure, the urgency, and recommended actions.

Machine ID: {{{machineId}}}
Sensor Data: {{{sensorData}}}

Respond with JSON:
`,
});

const predictFailureFlow = ai.defineFlow(
  {
    name: 'predictFailureFlow',
    inputSchema: PredictiveMaintenanceInputSchema,
    outputSchema: PredictiveMaintenanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
