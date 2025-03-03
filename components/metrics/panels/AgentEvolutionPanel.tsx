import React from 'react';
import { AgentHistoryPoint } from '../../../types/metrics';
import AgentEvolutionChart from '../charts/AgentEvolutionChart';

interface AgentEvolutionPanelProps {
  agentHistory: AgentHistoryPoint[];
}

const AgentEvolutionPanel: React.FC<AgentEvolutionPanelProps> = ({ agentHistory }) => {
  if (!agentHistory || agentHistory.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold">Agent Population Evolution</h4>
      <div className="mt-4">
        <AgentEvolutionChart agentHistory={agentHistory} />
      </div>
      <p className="text-sm text-gray-500 mt-2">
        This chart shows how the population of moral and immoral agents changes over time in the simulation.
      </p>
    </div>
  );
};

export default AgentEvolutionPanel; 