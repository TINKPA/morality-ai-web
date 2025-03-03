// components/MetricsPanel.tsx
import React from 'react';
import { MetricsPanelProps, calculateResourceMetrics } from '../types/metrics';
import AgentStatsPanel from './metrics/panels/AgentStatsPanel';
import HPStatsPanel from './metrics/panels/HPStatsPanel';
import AgentEvolutionPanel from './metrics/panels/AgentEvolutionPanel';
import ResourceStatsPanel from './metrics/panels/ResourceStatsPanel';
import CollapsiblePanel from './ui/CollapsiblePanel';

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics, checkpoint, agentHistory }) => {
  if (!metrics) {
    return (
      <CollapsiblePanel title="Simulation Metrics">
        <p>No metrics available.</p>
      </CollapsiblePanel>
    );
  }

  // Calculate resource metrics from checkpoint data
  const resourceMetrics = checkpoint ? calculateResourceMetrics(checkpoint.data) : null;

  return (
    <div className="space-y-4">
      <CollapsiblePanel title="Agent Statistics" defaultOpen={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AgentStatsPanel metrics={metrics} />
          <HPStatsPanel metrics={metrics} />
        </div>
      </CollapsiblePanel>
      
      {agentHistory && (
        <CollapsiblePanel title="Agent Evolution" defaultOpen={false}>
          <AgentEvolutionPanel agentHistory={agentHistory} />
        </CollapsiblePanel>
      )}
      
      {resourceMetrics && (
        <CollapsiblePanel title="Resource Statistics" defaultOpen={false}>
          <ResourceStatsPanel resourceMetrics={resourceMetrics} />
        </CollapsiblePanel>
      )}
    </div>
  );
};

export default MetricsPanel;
