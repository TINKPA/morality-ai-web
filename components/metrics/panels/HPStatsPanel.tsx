import React from 'react';
import { Metrics } from '../../../types/metrics';
import HPStatsChart from '../charts/HPStatsChart';

interface HPStatsPanelProps {
  metrics: Metrics;
}

const HPStatsPanel: React.FC<HPStatsPanelProps> = ({ metrics }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold">Health Points</h4>
      <p><strong>Average HP:</strong> {metrics?.averageHP?.toFixed(0) || 'N/A'}</p>
      <p><strong>Max HP:</strong> {metrics?.maxHP || 'N/A'}</p>
      <p><strong>Min HP:</strong> {metrics?.minHP || 'N/A'}</p>
      
      <div className="mt-4">
        <HPStatsChart metrics={metrics} />
      </div>
    </div>
  );
};

export default HPStatsPanel; 