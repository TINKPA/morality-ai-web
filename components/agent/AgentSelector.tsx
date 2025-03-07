import React from 'react';
import { AgentSelectorProps } from '../../types/agent';

const AgentSelector: React.FC<AgentSelectorProps> = ({
  agents,
  selectedAgentId,
  defaultSelectedAgentId,
  onSelectAgent,
}) => {
  return (
    <div className="relative">
      <select
        value={selectedAgentId || defaultSelectedAgentId || ''}
        onChange={(e) => onSelectAgent(e.target.value)}
        className="w-full p-2.5 pl-4 pr-10 bg-indigo-700 bg-opacity-30 text-white border border-indigo-500 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
      >
        <option value="" disabled className="text-gray-700">
          Select an agent
        </option>
        {agents.map((agent) => (
          <option key={agent.id} value={agent.id} className="text-gray-700">
            {agent.id}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default AgentSelector; 