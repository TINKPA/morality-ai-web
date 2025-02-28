// components/MetricsPanel.tsx
import React from 'react';
import { Metrics, MetricsPanelProps } from '../types/metrics';

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics }) => {
  if (!metrics) {
    return (
      <div className="p-4 border rounded shadow bg-white">
        <h3 className="text-xl font-bold mb-2">Simulation Metrics</h3>
        <p>No metrics available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="text-xl font-bold mb-2">Simulation Metrics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-lg font-semibold">Agent Statistics</h4>
          <p><strong>Total Agents:</strong> {metrics.totalAgents}</p>
          <p><strong>Moral Agents:</strong> {metrics.moralAgents}</p>
          <p><strong>Non-Moral Agents:</strong> {metrics.nonMoralAgents}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Health Points</h4>
          <p><strong>Average HP:</strong> {metrics?.averageHP?.toFixed(2) || 'N/A'}</p>
          <p><strong>Max HP:</strong> {metrics?.maxHP || 'N/A'}</p>
          <p><strong>Min HP:</strong> {metrics?.minHP || 'N/A'}</p>
        </div>
        {metrics.averageReputation !== undefined && (
          <div className="col-span-2">
            <h4 className="text-lg font-semibold">Reputation</h4>
            <p><strong>Average Reputation:</strong> {metrics.averageReputation.toFixed(2)}</p>
            <p><strong>Max Reputation:</strong> {metrics.maxReputation}</p>
            <p><strong>Min Reputation:</strong> {metrics.minReputation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsPanel;
