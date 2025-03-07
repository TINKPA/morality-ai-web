import React from 'react';
import { RecentActionsProps } from '../../types/agent';

const RecentActions: React.FC<RecentActionsProps> = ({ actionHistory }) => {
  if (!actionHistory || actionHistory.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xl font-medium">No actions recorded</p>
        <p className="mt-2 text-gray-400">This agent hasn't performed any actions yet</p>
      </div>
    );
  }

  // Sort action history by time step in descending order (most recent first)
  const sortedHistory = [...actionHistory].sort((a, b) => b.at_time_step - a.at_time_step);

  return (
    <div className="space-y-8">
      {sortedHistory.map((historyItem, index) => (
        <div key={`${historyItem.at_time_step}-${index}`} className="relative">
          {/* Time step indicator */}
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {historyItem.at_time_step}
            </div>
            <div className="ml-3">
              <span className="text-sm font-medium text-gray-900">Time Step</span>
              <span className="ml-2 text-xs text-gray-500">({new Date().toLocaleDateString()})</span>
            </div>
          </div>

          {/* Reasoning */}
          {historyItem.reasoning && (
            <div className="ml-12 mb-5">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-700 text-sm shadow-sm">
                <p className="italic">{historyItem.reasoning}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="ml-12 space-y-4">
            {historyItem.actions.map((action, actionIndex) => {
              // Determine action color based on action type
              const getActionColor = (type: string): string => {
                const colorMap: Record<string, string> = {
                  move: 'bg-blue-50 border-blue-200 hover:border-blue-300',
                  attack: 'bg-red-50 border-red-200 hover:border-red-300',
                  gather: 'bg-green-50 border-green-200 hover:border-green-300',
                  communicate: 'bg-purple-50 border-purple-200 hover:border-purple-300',
                  consume: 'bg-amber-50 border-amber-200 hover:border-amber-300',
                  share: 'bg-indigo-50 border-indigo-200 hover:border-indigo-300',
                  rob: 'bg-rose-50 border-rose-200 hover:border-rose-300',
                  reproduce: 'bg-pink-50 border-pink-200 hover:border-pink-300',
                };
                return colorMap[type.toLowerCase()] || 'bg-gray-50 border-gray-200 hover:border-gray-300';
              };

              // Get icon for action type
              const getActionIcon = (type: string): React.ReactNode => {
                const iconMap: Record<string, React.ReactNode> = {
                  move: (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ),
                  attack: (
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
                        <path fillRule="evenodd" d="M15 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V5.56l-3.97 3.97a.75.75 0 11-1.06-1.06l3.97-3.97h-2.69a.75.75 0 01-.75-.75zm-12 0A.75.75 0 013.75 3h4.5a.75.75 0 010 1.5H5.56l3.97 3.97a.75.75 0 01-1.06 1.06L4.5 5.56v2.69a.75.75 0 01-1.5 0v-4.5zm11.47 11.78a.75.75 0 111.06-1.06l3.97 3.97v-2.69a.75.75 0 011.5 0v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h2.69l-3.97-3.97zm-4.94-1.06a.75.75 0 010 1.06L5.56 19.5h2.69a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0v2.69l3.97-3.97a.75.75 0 011.06 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ),
                  gather: (
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600">
                        <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
                      </svg>
                    </div>
                  ),
                  communicate: (
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-600">
                        <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ),
                  consume: (
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-amber-600">
                        <path d="M11.25 3v4.046a3 3 0 00-4.277 4.204H1.5v-6A2.25 2.25 0 013.75 3h7.5zM12.75 3v4.011a3 3 0 014.239 4.239H22.5v-6A2.25 2.25 0 0020.25 3h-7.5zM22.5 12.75h-8.983a4.125 4.125 0 004.108 3.75.75.75 0 010 1.5 5.623 5.623 0 01-4.875-2.817V21h7.5a2.25 2.25 0 002.25-2.25v-6zM11.25 21v-5.817A5.623 5.623 0 016.375 18a.75.75 0 010-1.5 4.126 4.126 0 004.108-3.75H1.5v6A2.25 2.25 0 003.75 21h7.5z" />
                        <path d="M11.085 10.354c.03.297.038.575.036.805a7.484 7.484 0 01-.805-.036c-.833-.084-1.677-.325-2.195-.843a1.5 1.5 0 012.122-2.12c.517.517.759 1.36.842 2.194zM12.877 10.354c-.03.297-.038.575-.036.805.23.002.508-.006.805-.036.833-.084 1.677-.325 2.195-.843A1.5 1.5 0 0013.72 8.16c-.518.518-.76 1.362-.843 2.194z" />
                      </svg>
                    </div>
                  ),
                  share: (
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-600">
                        <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ),
                  rob: (
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-rose-600">
                        <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                        <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ),
                  reproduce: (
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-pink-600">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                    </div>
                  ),
                  collect: (
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-emerald-600">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ),
                };
                return iconMap[type.toLowerCase()] || (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-600">
                      <path fillRule="evenodd" d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 11-9 0V4.125zm4.5 14.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
                      <path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257zM12.738 17.625l6.474-6.474a1.875 1.875 0 000-2.651L15.5 4.787a1.875 1.875 0 00-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375z" />
                    </svg>
                  </div>
                );
              };

              // Get text color based on action type
              const getTextColor = (type: string): string => {
                const colorMap: Record<string, string> = {
                  move: 'text-blue-800',
                  attack: 'text-red-800',
                  gather: 'text-green-800',
                  communicate: 'text-purple-800',
                  consume: 'text-amber-800',
                  share: 'text-indigo-800',
                  rob: 'text-rose-800',
                  reproduce: 'text-pink-800',
                };
                return colorMap[type.toLowerCase()] || 'text-gray-800';
              };

              return (
                <div 
                  key={`${historyItem.at_time_step}-${actionIndex}`}
                  className={`p-4 rounded-lg border transition-all duration-200 shadow-sm ${getActionColor(action.action_type)}`}
                >
                  <div className="flex items-start">
                    <div className="mr-4">
                      {getActionIcon(action.action_type)}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex flex-wrap items-center">
                        <span className={`font-semibold capitalize ${getTextColor(action.action_type)} mr-2 text-base`}>
                          {action.action_type}
                        </span>
                        
                        {action.cost_of_action_points !== undefined && (
                          <span className="text-xs bg-white bg-opacity-70 text-gray-700 px-3 py-1 rounded-full font-medium shadow-sm">
                            Cost: {action.cost_of_action_points} points
                          </span>
                        )}
                      </div>
                      
                      {action.reason && (
                        <div className="text-sm text-gray-600 mt-2 italic bg-white bg-opacity-50 p-2 rounded">
                          Reason: {action.reason}
                        </div>
                      )}

                      {/* Additional action details */}
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        {action.target_agent_id && (
                          <div className="text-xs bg-white bg-opacity-70 p-2 rounded shadow-sm">
                            <span className="text-gray-500 font-medium">Target Agent:</span>
                            <div className="mt-1 font-medium">{action.target_agent_id}</div>
                          </div>
                        )}
                        
                        {action.resource_id && (
                          <div className="text-xs bg-white bg-opacity-70 p-2 rounded shadow-sm">
                            <span className="text-gray-500 font-medium">Resource:</span>
                            <div className="mt-1 font-medium">{action.resource_id}</div>
                          </div>
                        )}
                        
                        {action.quantity !== undefined && (
                          <div className="text-xs bg-white bg-opacity-70 p-2 rounded shadow-sm">
                            <span className="text-gray-500 font-medium">Quantity:</span>
                            <div className="mt-1 font-medium">{action.quantity}</div>
                          </div>
                        )}
                        
                        {action.target_location && (
                          <div className="text-xs bg-white bg-opacity-70 p-2 rounded shadow-sm">
                            <span className="text-gray-500 font-medium">Target Location:</span>
                            <div className="mt-1 font-medium">
                              ({action.target_location.x}, {action.target_location.y})
                            </div>
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
            <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-indigo-200" style={{ height: 'calc(100% - 16px)' }}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecentActions; 