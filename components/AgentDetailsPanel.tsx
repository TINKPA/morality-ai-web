'use client';

import React, { useState, useEffect } from 'react';
import AgentSelector from './agent/AgentSelector';
import BasicInformation from './agent/BasicInformation';
import AgentState from './agent/AgentState';
import AgentInventory from './agent/AgentInventory';
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
  const [activeTab, setActiveTab] = useState<'info' | 'actions'>('info');

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
    ? `${selectedAgent.logs.prompts.system_prompt}\n\n\`\`\`json
${formatUserPrompt(selectedAgent.logs.prompts.user_prompt)}
\`\`\``
    : '';
    
  const responseData = selectedAgent ? selectedAgent.logs.response : '';

  // Get agent type color
  const getAgentTypeColor = (type: string): string => {
    const colorMap: Record<string, string> = {
      moral: 'bg-green-100 text-green-800 border-green-200',
      immoral: 'bg-red-100 text-red-800 border-red-200',
      neutral: 'bg-blue-100 text-blue-800 border-blue-200',
      amoral: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    };
    return colorMap[type.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="border rounded-lg shadow-md bg-white overflow-hidden">
      {/* Header with title and agent selector */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Agent Details</h3>
          <div className="w-1/2">
            <AgentSelector
              agents={agents}
              selectedAgentId={selectedAgentId}
              defaultSelectedAgentId={defaultSelectedAgentId}
              onSelectAgent={onSelectAgent}
            />
          </div>
        </div>
      </div>

      {selectedAgent ? (
        <div>
          {/* Agent summary bar */}
          <div className="bg-gray-50 p-3 border-b flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg mr-3">
                {selectedAgent.id.split('_')[1] || selectedAgent.id.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{selectedAgent.id}</h4>
                <div className="flex items-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getAgentTypeColor(selectedAgent.type)}`}>
                    {selectedAgent.type}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-500">
                    Location: ({selectedAgent.state.location.x}, {selectedAgent.state.location.y})
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-4 flex items-center">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                <span className="text-sm text-gray-600">Active</span>
              </div>
              {(promptData || responseData) && (
                <button
                  onClick={() => setShowSubWindow(true)}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-sm flex items-center text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Communication
                </button>
              )}
            </div>
          </div>

          {/* Tab navigation */}
          <div className="border-b">
            <div className="flex">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'info' 
                    ? 'border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('info')}
              >
                Information
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'actions' 
                    ? 'border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('actions')}
              >
                Actions
              </button>
            </div>
          </div>

          {/* Content area */}
          <div className="p-4">
            {activeTab === 'info' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  {/* Basic Information Card */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-semibold text-gray-700">Basic Information</h4>
                    </div>
                    <div className="p-4">
                      <BasicInformation agent={selectedAgent} />
                    </div>
                  </div>

                  {/* State Card */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-semibold text-gray-700">State</h4>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* HP indicator */}
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-500">HP</span>
                            <span className="text-sm font-medium">{selectedAgent.state.hp}/100</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-green-600 h-2.5 rounded-full" 
                              style={{ width: `${Math.min(100, Math.max(0, selectedAgent.state.hp))}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Age indicator */}
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-500">Age</span>
                            <span className="text-sm font-medium">{selectedAgent.state.age}</span>
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-600">Time units</span>
                          </div>
                        </div>
                      </div>

                      <AgentState state={selectedAgent.state} />
                    </div>
                  </div>
                </div>

                {/* Inventory Card */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <h4 className="font-semibold text-gray-700">Inventory</h4>
                  </div>
                  <div className="p-4">
                    <AgentInventory inventory={selectedAgent.inventory} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'actions' && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h4 className="font-semibold text-gray-700">Recent Actions</h4>
                </div>
                <div className="p-4">
                  <RecentActions actionHistory={selectedAgent.action_history} />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-lg font-medium">No agent selected</p>
          <p className="mt-1">Please select an agent from the dropdown above</p>
        </div>
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
