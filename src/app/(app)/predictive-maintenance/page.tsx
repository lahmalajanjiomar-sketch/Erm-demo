'use client';

import { predictFailure } from '@/ai/flows/predictive-maintenance-alerts';
import { PredictionForm } from '@/components/predictive-maintenance/prediction-form';
import type { PredictiveMaintenanceInput, PredictiveMaintenanceOutput } from '@/ai/flows/predictive-maintenance-alerts';

export default function PredictiveMaintenancePage() {
  
  async function handlePrediction(data: PredictiveMaintenanceInput): Promise<PredictiveMaintenanceOutput | null> {
    const result = await predictFailure(data);
    return result;
  }

  return (
      <PredictionForm onPredict={handlePrediction} />
  );
}
