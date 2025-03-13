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
  
  // Get metadata from checkpoint data
  const metadata = checkpoint?.data?.metadata || null;

  return (
    <div className="space-y-4">
      {metadata && (
        <CollapsiblePanel title="Simulation Metadata" defaultOpen={true}>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium text-gray-600">Run ID:</div>
              <div>{metadata.run_id}</div>
              
              <div className="font-medium text-gray-600">Version:</div>
              <div>{metadata.version}</div>
              
              <div className="font-medium text-gray-600">Simulation Name:</div>
              <div>{metadata.simulation_name}</div>
              
              <div className="font-medium text-gray-600">Start Date:</div>
              <div>{metadata.start_date}</div>
              
              <div className="font-medium text-gray-600">Current Step:</div>
              <div>{metadata.current_time_step} / {metadata.total_time_steps}</div>
              
              <div className="font-medium text-gray-600">Current Agent:</div>
              <div>{metadata.current_agent_index !== undefined ? 
                `Agent ${metadata.excution_queue?.[metadata.current_agent_index]}` : 
                'N/A'}</div>
            </div>
          </div>
        </CollapsiblePanel>
      )}
      
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
