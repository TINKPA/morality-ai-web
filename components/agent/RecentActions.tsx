import React from 'react';
import { RecentActionsProps } from '../../types/agent';

const RecentActions: React.FC<RecentActionsProps> = ({ actionHistory }) => {
  if (!actionHistory || actionHistory.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-lg font-medium">No actions recorded</p>
        <p className="mt-1">This agent hasn't performed any actions yet</p>
      </div>
    );
  }

  // Sort action history by time step in descending order (most recent first)
  const sortedHistory = [...actionHistory].sort((a, b) => b.at_time_step - a.at_time_step);

  return (
    <div className="space-y-6">
      {sortedHistory.map((historyItem, index) => (
        <div key={`${historyItem.at_time_step}-${index}`} className="relative">
          {/* Time step indicator */}
          <div className="flex items-center mb-3">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium text-sm">
              {historyItem.at_time_step}
            </div>
            <div className="ml-3">
              <span className="text-sm font-medium text-gray-900">Time Step</span>
              <span className="ml-2 text-xs text-gray-500">({new Date().toLocaleDateString()})</span>
            </div>
          </div>

          {/* Reasoning */}
          {historyItem.reasoning && (
            <div className="ml-10 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-700 text-sm">
                <p className="italic">{historyItem.reasoning}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="ml-10 space-y-3">
            {historyItem.actions.map((action, actionIndex) => {
              // Determine action color based on action type
              const getActionColor = (type: string): string => {
                const colorMap: Record<string, string> = {
                  move: 'bg-blue-50 border-blue-200',
                  attack: 'bg-red-50 border-red-200',
                  gather: 'bg-green-50 border-green-200',
                  communicate: 'bg-purple-50 border-purple-200',
                  consume: 'bg-amber-50 border-amber-200',
                  share: 'bg-indigo-50 border-indigo-200',
                  rob: 'bg-rose-50 border-rose-200',
                  reproduce: 'bg-pink-50 border-pink-200',
                };
                return colorMap[type.toLowerCase()] || 'bg-gray-50 border-gray-200';
              };

              // Get icon for action type
              const getActionIcon = (type: string): React.ReactNode => {
                const iconMap: Record<string, React.ReactNode> = {
                  move: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  ),
                  attack: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ),
                  gather: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  ),
                  communicate: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  ),
                  consume: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  share: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  ),
                };
                return iconMap[type.toLowerCase()] || (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                );
              };

              return (
                <div 
                  key={`${historyItem.at_time_step}-${actionIndex}`}
                  className={`p-3 rounded-lg border ${getActionColor(action.action_type)}`}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      {getActionIcon(action.action_type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center">
                        <span className="font-semibold capitalize text-gray-800 mr-2">
                          {action.action_type}
                        </span>
                        
                        {action.cost_of_action_points !== undefined && (
                          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                            Cost: {action.cost_of_action_points} points
                          </span>
                        )}
                      </div>
                      
                      {action.reason && (
                        <div className="text-sm text-gray-600 mt-1 italic">
                          Reason: {action.reason}
                        </div>
                      )}

                      {/* Additional action details */}
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {action.target_agent_id && (
                          <div className="text-xs bg-gray-100 p-1.5 rounded">
                            <span className="text-gray-500">Target Agent:</span>
                            <span className="ml-1 font-medium">{action.target_agent_id}</span>
                          </div>
                        )}
                        
                        {action.resource_id && (
                          <div className="text-xs bg-gray-100 p-1.5 rounded">
                            <span className="text-gray-500">Resource:</span>
                            <span className="ml-1 font-medium">{action.resource_id}</span>
                          </div>
                        )}
                        
                        {action.quantity !== undefined && (
                          <div className="text-xs bg-gray-100 p-1.5 rounded">
                            <span className="text-gray-500">Quantity:</span>
                            <span className="ml-1 font-medium">{action.quantity}</span>
                          </div>
                        )}
                        
                        {action.target_location && (
                          <div className="text-xs bg-gray-100 p-1.5 rounded">
                            <span className="text-gray-500">Target Location:</span>
                            <span className="ml-1 font-medium">
                              ({action.target_location.x}, {action.target_location.y})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Timeline connector (except for the last item) */}
          {index < sortedHistory.length - 1 && (
            <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200" style={{ height: 'calc(100% - 16px)' }}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecentActions; 