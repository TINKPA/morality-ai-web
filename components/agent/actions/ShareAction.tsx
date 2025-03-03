import React from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import ActionBase from './ActionBase';

interface ShareActionProps {
  action: {
    action_type: string;
    description?: string;
    reason?: string;
    cost_of_action_points?: number;
    resource_id: string;
    quantity: number;
    target_agent_id: string;
  };
}

const ShareAction: React.FC<ShareActionProps> = ({ action }) => {
  return (
    <ActionBase
      action={action}
      icon={<ShareIcon className="h-6 w-6 text-indigo-500" />}
      bgColor="bg-indigo-50"
    >
      <div className="mt-2">
        <div className="flex items-center">
          <div className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md flex items-center">
            <span className="font-medium">{action.resource_id}</span>
            <span className="mx-1">×</span>
            <span className="bg-white px-1.5 py-0.5 rounded text-indigo-700 font-semibold">
              {action.quantity}
            </span>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-sm text-gray-600 mr-2">Shared with:</span>
          <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md text-sm font-medium">
            Agent {action.target_agent_id}
          </span>
        </div>
      </div>
    </ActionBase>
  );
};

export default ShareAction; 