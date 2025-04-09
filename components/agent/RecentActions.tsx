import React from 'react';
import { AgentAction } from '../../types/agent';

interface RecentActionsProps {
  actions: AgentAction[];
}

const RecentActions: React.FC<RecentActionsProps> = ({ actions }) => {
  if (!actions || actions.length === 0) {
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

  // Sort actions by index in descending order (most recent first)
  const sortedActions = [...actions].reverse();

  // Helper functions for styling
  const getActionColor = (type: string): string => {
    const colorMap: Record<string, string> = {
      move: 'bg-blue-50 border-blue-200 hover:border-blue-300',
      attack: 'bg-red-50 border-red-200 hover:border-red-300',
      collect: 'bg-green-50 border-green-200 hover:border-green-300',
      communicate: 'bg-purple-50 border-purple-200 hover:border-purple-300',
      consume: 'bg-amber-50 border-amber-200 hover:border-amber-300',
      share: 'bg-indigo-50 border-indigo-200 hover:border-indigo-300',
      rob: 'bg-rose-50 border-rose-200 hover:border-rose-300',
      reproduce: 'bg-pink-50 border-pink-200 hover:border-pink-300',
      do_nothing: 'bg-gray-50 border-gray-200 hover:border-gray-300',
    };
    return colorMap[type.toLowerCase()] || 'bg-gray-50 border-gray-200 hover:border-gray-300';
  };

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
      collect: (
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
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      rob: (
        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-rose-600">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      reproduce: (
        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-pink-600">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      do_nothing: (
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-600">
            <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
          </svg>
        </div>
      ),
    };
    return iconMap[type.toLowerCase()] || (
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-600">
          <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
        </svg>
      </div>
    );
  };

  const getTextColor = (type: string): string => {
    const colorMap: Record<string, string> = {
      move: 'text-blue-700',
      attack: 'text-red-700',
      collect: 'text-green-700',
      communicate: 'text-purple-700',
      consume: 'text-amber-700',
      share: 'text-indigo-700',
      rob: 'text-rose-700',
      reproduce: 'text-pink-700',
      do_nothing: 'text-gray-700',
    };
    return colorMap[type.toLowerCase()] || 'text-gray-700';
  };

  const renderActionDetails = (action: AgentAction): React.ReactNode => {
    switch (action.action_type) {
      case 'move':
        return (
          <div className={`p-4 rounded-lg border ${getActionColor(action.action_type)}`}>
            <div className="flex items-start">
              {getActionIcon(action.action_type)}
              <div className="ml-4 flex-1">
                <h3 className={`text-sm font-medium ${getTextColor(action.action_type)}`}>
                  Move
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  From ({action.current_location.x}, {action.current_location.y}) to ({action.target_location.x}, {action.target_location.y})
                </p>
              </div>
            </div>
          </div>
        );
      case 'collect':
        return (
          <div className={`p-4 rounded-lg border ${getActionColor(action.action_type)}`}>
            <div className="flex items-start">
              {getActionIcon(action.action_type)}
              <div className="ml-4 flex-1">
                <h3 className={`text-sm font-medium ${getTextColor(action.action_type)}`}>
                  Collect
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Resource ID: {action.resource_id}
                </p>
              </div>
            </div>
          </div>
        );
      case 'consume':
        return (
          <div className={`p-4 rounded-lg border ${getActionColor(action.action_type)}`}>
            <div className="flex items-start">
              {getActionIcon(action.action_type)}
              <div className="ml-4 flex-1">
                <h3 className={`text-sm font-medium ${getTextColor(action.action_type)}`}>
                  Consume
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Resource ID: {action.resource_id}
                </p>
              </div>
            </div>
          </div>
        );
      case 'share':
        return (
          <div className={`p-4 rounded-lg border ${getActionColor(action.action_type)}`}>
            <div className="flex items-start">
              {getActionIcon(action.action_type)}
              <div className="ml-4 flex-1">
                <h3 className={`text-sm font-medium ${getTextColor(action.action_type)}`}>
                  Share
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Resource ID: {action.resource_id} with Agent: {action.target_agent_id}
                </p>
              </div>
            </div>
          </div>
        );
      case 'attack':
        return (
          <div className={`p-4 rounded-lg border ${getActionColor(action.action_type)}`}>
            <div className="flex items-start">
              {getActionIcon(action.action_type)}
              <div className="ml-4 flex-1">
                <h3 className={`text-sm font-medium ${getTextColor(action.action_type)}`}>
                  Attack
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Target: {action.target_id} (Type: {action.target_type})
                </p>
              </div>
            </div>
          </div>
        );
      case 'rob':
        return (
          <div className={`p-4 rounded-lg border ${getActionColor(action.action_type)}`}>
            <div className="flex items-start">
              {getActionIcon(action.action_type)}
              <div className="ml-4 flex-1">
                <h3 className={`text-sm font-medium ${getTextColor(action.action_type)}`}>
                  Rob
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Resource ID: {action.resource_id} from Agent: {action.target_agent_id}
                </p>
              </div>
            </div>
          </div>
        );
      case 'reproduce':
        return (
          <div className={`p-4 rounded-lg border ${getActionColor(action.action_type)}`}>
            <div className="flex items-start">
              {getActionIcon(action.action_type)}
              <div className="ml-4 flex-1">
                <h3 className={`text-sm font-medium ${getTextColor(action.action_type)}`}>
                  Reproduce
                </h3>
              </div>
            </div>
          </div>
        );
      case 'communicate':
        return (
          <div className={`p-4 rounded-lg border ${getActionColor(action.action_type)}`}>
            <div className="flex items-start">
              {getActionIcon(action.action_type)}
              <div className="ml-4 flex-1">
                <h3 className={`text-sm font-medium ${getTextColor(action.action_type)}`}>
                  Communicate
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  To Agent: {action.target_agent_id}
                </p>
                <p className="mt-1 text-sm text-gray-600 italic">
                  "{action.message}"
                </p>
              </div>
            </div>
          </div>
        );
      case 'do_nothing':
        return (
          <div className={`p-4 rounded-lg border ${getActionColor(action.action_type)}`}>
            <div className="flex items-start">
              {getActionIcon(action.action_type)}
              <div className="ml-4 flex-1">
                <h3 className={`text-sm font-medium ${getTextColor(action.action_type)}`}>
                  Do Nothing
                </h3>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 rounded-lg border bg-gray-50 border-gray-200">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-600">
                  <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-medium text-gray-700">
                  Unknown Action
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {JSON.stringify(action)}
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {sortedActions.slice(0, 1).map((action, index) => (
        <div key={`${action.action_type}-${index}`} className="relative">
          {/* Action type indicator */}
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {index + 1}
            </div>
            <div className="ml-3">
              <span className="text-sm font-medium text-gray-900">Action</span>
              <span className="ml-2 text-xs text-gray-500">{action.action_type}</span>
            </div>
          </div>

          {/* Reasoning */}
          {action.reason && (
            <div className="ml-12 mb-5">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-700 text-sm shadow-sm">
                <p className="italic">{action.reason}</p>
              </div>
            </div>
          )}

          {/* Action details */}
          <div className="ml-12 space-y-4">
            {renderActionDetails(action)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActions; 