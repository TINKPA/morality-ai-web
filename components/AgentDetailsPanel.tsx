'use client';

import React, { useState, useEffect } from 'react';
import AgentSelector from './agent/AgentSelector';
import BasicInformation from './agent/BasicInformation';
import AgentState from './agent/AgentState';
import RecentActions from './agent/RecentActions';
import PromptResponseSubWindow from './agent/PromptResponseSubWindow';
import { Agent, AgentDetailsPanelProps } from '../types/agent';

const AgentDetailsPanel: React.FC<AgentDetailsPanelProps> = ({
  agents,
  selectedAgentId,
  onSelectAgent,
}) => {
  const [defaultSelectedAgentId, setDefaultSelectedAgentId] = useState<string | null>(null);
  const [showSubWindow, setShowSubWindow] = useState(false);

  useEffect(() => {
    if (agents.length > 0 && !selectedAgentId) {
      setDefaultSelectedAgentId(agents[0].id);
      onSelectAgent(agents[0].id);
    }
  }, [agents, selectedAgentId, onSelectAgent]);

  const selectedAgent = agents.find(
    (agent) => agent.id === (selectedAgentId || defaultSelectedAgentId)
  );

  const formatUserPrompt = (prompt: string): string => {
    try {
      const parsed = JSON.parse(prompt);
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      return prompt;
    }
  };

  const promptData = selectedAgent 
    ? `${selectedAgent.logs.prompts.system_prompt}\n\n${
        ` \`\`\`json
${formatUserPrompt(selectedAgent.logs.prompts.user_prompt)}
\`\`\``
      }`
    : '';
    
  const responseData = selectedAgent ? selectedAgent.logs.response : '';

  return (
    <div className="p-4 border rounded shadow bg-white relative">
      <h3 className="text-xl font-bold mb-2">Agent Details</h3>
      
      <AgentSelector
        agents={agents}
        selectedAgentId={selectedAgentId}
        defaultSelectedAgentId={defaultSelectedAgentId}
        onSelectAgent={onSelectAgent}
      />

      {selectedAgent ? (
        <div>
          <BasicInformation agent={selectedAgent} />
          
          <AgentState state={selectedAgent.state} />
          
          {(promptData || responseData) && (
            <div className="my-4">
              <button
                onClick={() => setShowSubWindow(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                View Prompt &amp; Response
              </button>
            </div>
          )}
          
          <RecentActions actionHistory={selectedAgent.action_history} />
        </div>
      ) : (
        <p>No agent selected.</p>
      )}

      {showSubWindow && selectedAgent && (
        <PromptResponseSubWindow
          prompt={promptData}
          response={responseData}
          onClose={() => setShowSubWindow(false)}
        />
      )}
    </div>
  );
};

export default AgentDetailsPanel;
