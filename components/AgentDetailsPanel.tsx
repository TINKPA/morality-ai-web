'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export interface Agent {
  id: string;
  type: string;
  created_at_step: number | null;
  state: {
    hp: number;
    age: number;
    food_stock: number;
    location: { x: number; y: number };
    reputation: number;
    is_alive?: boolean;
  };
  attributes: { [key: string]: string | number };
  inventory: Array<{
    type: string;
    quantity: number;
    phase: string;
  }>;
  memory: {
    long_term_memory?: string;
    beliefs?: string[];
    received_messages?: [content: string];
  };
  action_history: Array<{
    at_time_step: number;
    reasoning: string;
    actions: Array<{
      action_type: string;
      target_location?: { x: number; y: number };
      reason?: string;
    }>;
  }>;
  logs: {
    prompts: {
      system_prompt: string;
      user_prompt: string;
    };
    response: string;
  };
}

interface AgentDetailsPanelProps {
  agents: Agent[];
  selectedAgentId: string | null;
  onSelectAgent: (id: string) => void;
}

const PromptResponseSubWindow: React.FC<{
  prompt: string;
  response: string;
  onClose: () => void;
}> = ({ prompt, response, onClose }) => {
  const [showPrompt, setShowPrompt] = useState(true);

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-3/4 h-3/4 overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold"
        >
          Close
        </button>
        <div>
          <button
            onClick={() => setShowPrompt(!showPrompt)}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            {showPrompt ? 'Show Response' : 'Show Prompt'}
          </button>
          {showPrompt ? (
            <>
              <h3 className="text-xl font-bold mb-2">Prompt</h3>
              <div className="border p-2 rounded mb-4 overflow-auto">
                <ReactMarkdown>{prompt || 'No prompt available.'}</ReactMarkdown>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold mb-2">Response</h3>
              <div className="border p-2 rounded overflow-auto">
              <ReactMarkdown>{` \`\`\` json
                ${JSON.stringify(JSON.parse(response), null, 4)}
                \`\`\``}</ReactMarkdown>              
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

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

      {selectedAgent ? (
        <div>
          <h3 className="text-xl font-bold mb-2">Agent Details: {selectedAgent.id}</h3>

          {/* Basic Information */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Basic Information</h4>
            <p>
              <strong>ID:</strong> {selectedAgent.id}
            </p>
            <p>
              <strong>Type:</strong> {selectedAgent.type}
            </p>
            <p>
              <strong>Created at Step:</strong> {selectedAgent.created_at_step ?? 'N/A'}
            </p>
          </div>

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

          {/* State */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold">State</h4>
            <p>
              <strong>HP:</strong> {selectedAgent.state.hp}
            </p>
            <p>
              <strong>Age:</strong> {selectedAgent.state.age}
            </p>
            <p>
              <strong>Food Stock:</strong> {selectedAgent.state.food_stock}
            </p>
            <p>
              <strong>Location:</strong> ({selectedAgent.state.location.x}, {selectedAgent.state.location.y})
            </p>
            <p>
              <strong>Reputation:</strong> {selectedAgent.state.reputation.toFixed(2)}
            </p>
            {selectedAgent.state.is_alive !== undefined && (
              <p>
                <strong>Alive:</strong> {selectedAgent.state.is_alive ? 'Yes' : 'No'}
              </p>
            )}
          </div>

          {/* Attributes */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Attributes</h4>
            {Object.entries(selectedAgent.attributes).map(([key, value]) => (
              <p key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </p>
            ))}
          </div>

          {/* Inventory */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Inventory</h4>
            {selectedAgent.inventory && selectedAgent.inventory.length > 0 ? (
              selectedAgent.inventory.map((item, index) => (
                <p key={index}>
                  <strong>Qty:</strong> {item.quantity} <strong>Type:</strong> {item.type}{' '}
                  <strong>Phase:</strong> {item.phase}
                </p>
              ))
            ) : (
              <p>Empty</p>
            )}
          </div>

          {/* Memory */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Memory</h4>
            <p>
              <strong>Long Term Memory:</strong> {selectedAgent.memory.long_term_memory || 'None'}
            </p>
            {selectedAgent.memory.beliefs && (
              <div>
                <strong>Beliefs:</strong>
                <ul className="list-disc list-inside">
                  {selectedAgent.memory.beliefs.map((belief, index) => (
                    <li key={index}>{belief}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedAgent.memory.received_messages && (
              <div>
                <strong>Recent Messages:</strong>
                <ul className="list-disc list-inside">
                  {selectedAgent.memory.received_messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Recent Actions */}
          <div>
            <h4 className="text-lg font-semibold">Recent Actions</h4>
            {selectedAgent.action_history && selectedAgent.action_history.length > 0 ? (
              selectedAgent.action_history.slice().reverse().map((action, index) => (
                <div key={index} className="mb-2">
                  <p>
                    <strong>Step {action.at_time_step}:</strong> {action.reasoning}
                  </p>
                  {action.actions && action.actions.length > 0 && (
                    <ul className="list-disc list-inside">
                      {action.actions.map((act, i) => (
                        <li key={i}>
                          <strong>Action:</strong> {act.action_type}
                          {act.target_location &&
                            ` → (${act.target_location.x}, ${act.target_location.y})`}
                          {act.reason && (
                            <div>
                              <strong>Reason:</strong> {act.reason}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p>No actions recorded.</p>
            )}
          </div>

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
