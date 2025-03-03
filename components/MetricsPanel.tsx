// components/MetricsPanel.tsx
import React from 'react';
import { MetricsPanelProps, calculateResourceMetrics } from '../types/metrics';
import AgentStatsPanel from './metrics/panels/AgentStatsPanel';
import HPStatsPanel from './metrics/panels/HPStatsPanel';
import AgentEvolutionPanel from './metrics/panels/AgentEvolutionPanel';
import ResourceStatsPanel from './metrics/panels/ResourceStatsPanel';

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics, checkpoint, agentHistory }) => {
  if (!metrics) {
    return (
      <div className="p-4 border rounded shadow bg-white">
        <h3 className="text-xl font-bold mb-2">Simulation Metrics</h3>
        <p>No metrics available.</p>
      </div>
    );
  }

  // Calculate resource metrics from checkpoint data
  const resourceMetrics = checkpoint ? calculateResourceMetrics(checkpoint.data) : null;

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="text-xl font-bold mb-2">Simulation Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AgentStatsPanel metrics={metrics} />
        <HPStatsPanel metrics={metrics} />
      </div>
      
      {agentHistory && <AgentEvolutionPanel agentHistory={agentHistory} />}
      
      {resourceMetrics && <ResourceStatsPanel resourceMetrics={resourceMetrics} />}
    </div>
  );
};

export default MetricsPanel;
