import React from 'react';

interface AgentSelectorProps {
  agents: any[];
  selectedAgentId: string | null;
  defaultSelectedAgentId?: string | null;
  onSelectAgent: (agentId: string) => void;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({
  agents,
  selectedAgentId,
  defaultSelectedAgentId,
  onSelectAgent,
}) => {
  return (
    <select
      value={selectedAgentId || defaultSelectedAgentId || ''}
      onChange={(e) => onSelectAgent(e.target.value)}
      className="p-2 border rounded mb-4"
    >
      <option value="" disabled>
        Select an agent
      </option>
      {agents.map((agent) => (
        <option key={agent.id} value={agent.id}>
          {agent.id}
        </option>
      ))}
    </select>
  );
};

export default AgentSelector; 