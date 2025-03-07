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
  const [activeTab, setActiveTab] = useState<'info' | 'actions' | 'messages'>('info');

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
    ? `${selectedAgent?.logs?.prompts?.system_prompt}\n\n\`\`\`json
${formatUserPrompt(selectedAgent?.logs?.prompts?.user_prompt)}
\`\`\``
    : '';
    
  const responseData = selectedAgent ? selectedAgent?.logs?.response : '';

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

  // Message Item Component
  const MessageItem = ({ message, index }: { message: string; index: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    // Truncate message if it's too long
    const maxLength = 100;
    const isTruncated = message.length > maxLength;
    const displayMessage = isExpanded ? message : (isTruncated ? `${message.substring(0, maxLength)}...` : message);
    
    // Generate a fake timestamp for demo purposes
    const getRelativeTime = () => {
      const times = ['Just now', '2 min ago', '5 min ago', '10 min ago', '15 min ago', '30 min ago', '1 hour ago', '2 hours ago'];
      return times[index % times.length];
    };
    
    // Generate a sender for demo purposes
    const getSender = () => {
      const senders = ['agent_1', 'agent_2', 'agent_5', 'agent_7', 'agent_9'];
      return senders[index % senders.length];
    };
    
    return (
      <>
        <div 
          className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 shadow-sm h-[140px] overflow-hidden relative hover:border-indigo-300 transition-colors duration-200 cursor-pointer"
          onClick={() => {
            if (isTruncated) {
              setShowModal(true);
            } else {
              setIsExpanded(!isExpanded);
            }
          }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-start mb-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center shadow-sm mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-600">
                  <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-indigo-800">{getSender()}</span>
                  <span className="text-xs text-gray-500">{getRelativeTime()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <div className="text-sm text-gray-700 italic">
                "{displayMessage}"
              </div>
              {isTruncated && (
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-indigo-50 to-transparent flex items-end justify-center pb-1">
                  <span className="text-xs text-indigo-600 font-medium">
                    View full message
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full Message Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                      <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Message from {getSender()}</h3>
                </div>
                <button 
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1"
                  onClick={() => setShowModal(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
                <div className="text-gray-700 italic">
                  "{message}"
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 border-t flex justify-between">
                <span className="text-xs text-gray-500">{getRelativeTime()}</span>
                <button 
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="border rounded-lg shadow-lg bg-white overflow-hidden">
      {/* Header with title and agent selector */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Agent Details</h3>
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
          <div className="bg-white p-4 border-b flex items-center justify-between shadow-sm">
            <div className="flex items-center">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md">
                {selectedAgent.id.split('_')[1] || selectedAgent.id.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">{selectedAgent.id}</h4>
                <div className="flex items-center mt-1">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getAgentTypeColor(selectedAgent.type)}`}>
                    {selectedAgent.type}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    ({selectedAgent.state.location.x}, {selectedAgent.state.location.y})
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {(promptData || responseData) && (
                <button
                  onClick={() => setShowSubWindow(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-sm flex items-center text-sm font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Communication
                </button>
              )}
            </div>
          </div>

          {/* Tab navigation */}
          <div className="border-b bg-gray-50">
            <div className="flex px-4">
              <button
                className={`px-5 py-3 font-medium transition-colors duration-200 ${
                  activeTab === 'info' 
                    ? 'border-b-2 border-indigo-500 text-indigo-700 bg-white' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('info')}
              >
                Information
              </button>
              <button
                className={`px-5 py-3 font-medium transition-colors duration-200 ${
                  activeTab === 'actions' 
                    ? 'border-b-2 border-indigo-500 text-indigo-700 bg-white' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('actions')}
              >
                Actions
              </button>
              <button
                className={`px-5 py-3 font-medium transition-colors duration-200 ${
                  activeTab === 'messages' 
                    ? 'border-b-2 border-indigo-500 text-indigo-700 bg-white' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('messages')}
              >
                Messages
              </button>
            </div>
          </div>

          {/* Content area */}
          <div className="p-5 bg-gray-50">
            {activeTab === 'info' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  {/* Basic Information Card */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-5 overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-b">
                      <h4 className="font-semibold text-gray-800">Basic Information</h4>
                    </div>
                    <div className="p-4">
                      <BasicInformation agent={selectedAgent} />
                    </div>
                  </div>

                  {/* State Card */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-b">
                      <h4 className="font-semibold text-gray-800">State</h4>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* HP indicator */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-300 transition-colors duration-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600">HP</span>
                            <span className="text-sm font-medium">{selectedAgent.state.hp}/100</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 ${
                                selectedAgent.state.hp > 70 ? 'bg-green-500' : 
                                selectedAgent.state.hp > 30 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(100, Math.max(0, selectedAgent.state.hp))}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Age indicator */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600">Age</span>
                            <span className="text-sm font-medium">{selectedAgent.state.age}</span>
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700">Time units</span>
                          </div>
                        </div>
                      </div>

                      <AgentState state={selectedAgent.state} />
                    </div>
                  </div>
                </div>

                {/* Inventory Card */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-b">
                    <h4 className="font-semibold text-gray-800">Inventory</h4>
                  </div>
                  <div className="p-4">
                    <AgentInventory inventory={selectedAgent.inventory} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'actions' && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-b">
                  <h4 className="font-semibold text-gray-800">Recent Actions</h4>
                </div>
                <div className="p-4">
                  <RecentActions actionHistory={selectedAgent.action_history} />
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-b">
                  <h4 className="font-semibold text-gray-800">Messages Received</h4>
                </div>
                <div className="p-4">
                  {selectedAgent.memory && selectedAgent.memory.received_messages && selectedAgent.memory.received_messages.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3">
                      {selectedAgent.memory.received_messages.map((message, index) => (
                        <div className="col-span-1">
                          <MessageItem key={index} message={message} index={index} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <p className="text-xl font-medium">No messages received</p>
                      <p className="mt-2 text-gray-400">This agent hasn't received any messages yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-10 text-center text-gray-500 bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-xl font-medium">No agent selected</p>
          <p className="mt-2 text-gray-400">Please select an agent from the dropdown above</p>
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
