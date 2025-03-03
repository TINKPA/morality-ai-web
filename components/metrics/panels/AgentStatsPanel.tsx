import React from 'react';
import { Metrics } from '../../../types/metrics';
import AgentDistributionChart from '../charts/AgentDistributionChart';

interface AgentStatsPanelProps {
  metrics: Metrics;
}

const AgentStatsPanel: React.FC<AgentStatsPanelProps> = ({ metrics }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold">Agent Statistics</h4>
      <p><strong>Total Agents:</strong> {metrics.totalAgents}</p>
      <p><strong>Moral Agents:</strong> {metrics.moralAgents}</p>
      <p><strong>Immoral Agents:</strong> {metrics.nonMoralAgents}</p>
      
      <div className="mt-4">
        <AgentDistributionChart metrics={metrics} />
      </div>
    </div>
  );
};

export default AgentStatsPanel; 