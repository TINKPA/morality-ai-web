// components/MetricsPanel.tsx
import React from 'react';

interface Metrics {
  totalAgents: number;
  moralAgents: number;
  nonMoralAgents: number;
  averageHP: number;
  maxHP: number;
  minHP: number;
  averageReputation?: number;
  maxReputation?: number;
  minReputation?: number;
}

interface MetricsPanelProps {
  metrics: Metrics;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics }) => (
  <div className="p-4 border rounded shadow bg-white">
    <h3 className="text-xl font-bold mb-2">Metrics & Statistics</h3>
    <p><strong>Total Agents:</strong> {metrics.totalAgents}</p>
    <p><strong>Moral Agents:</strong> {metrics.moralAgents}</p>
    <p><strong>Immoral Agents:</strong> {metrics.nonMoralAgents}</p>
    <p><strong>Avg HP:</strong> {metrics.averageHP.toFixed(1)}</p>
    <p><strong>Max HP:</strong> {metrics.maxHP}</p>
    <p><strong>Min HP:</strong> {metrics.minHP}</p>
    {metrics.averageReputation !== undefined && (
      <>
        <p><strong>Avg Rep:</strong> {metrics.averageReputation.toFixed(2)}</p>
        <p><strong>Max Rep:</strong> {metrics.maxReputation?.toFixed(2)}</p>
        <p><strong>Min Rep:</strong> {metrics.minReputation?.toFixed(2)}</p>
      </>
    )}
  </div>
);

export default MetricsPanel;
