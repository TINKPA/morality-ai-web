import React from 'react';
import { RecentActionsProps } from '../../types/agent';
import { ActionRenderer } from './actions';

const RecentActions: React.FC<RecentActionsProps> = ({ actionHistory = [] }) => {
  if (!actionHistory.length) {
    return <p className="text-gray-500 italic">No actions recorded.</p>;
  }

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold border-b pb-2">Recent Actions</h4>
      {actionHistory.slice().reverse().slice(0, 1).map((action, index) => (
        <div key={index} className="mb-4 p-3 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center mb-2">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-700 mr-2">
              {action.at_time_step}
            </span>
            <p className="font-medium text-gray-800">{action.reasoning}</p>
          </div>
          
          {action.actions && action.actions.length > 0 && (
            <div className="space-y-2 mt-2">
              {action.actions.map((act, i) => (
                <ActionRenderer key={i} action={act} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecentActions; 