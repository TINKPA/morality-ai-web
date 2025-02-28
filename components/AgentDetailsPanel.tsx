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

  const promptData = selectedAgent ? `${selectedAgent.logs.prompts.system_prompt}\n\n${
     ` \`\`\` json
      ${JSON.stringify(JSON.parse(selectedAgent.logs.prompts.user_prompt), null, 4)}
      \`\`\``
  }` : '';
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

          {/* Button to open prompt/response sub window */}
          {(promptData || responseData) && (
            <div className="mt-4">
              <button
                onClick={() => setShowSubWindow(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Show Prompt &amp; Response
              </button>
            </div>
          )}

          <AgentState state={selectedAgent.state} />
          
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
