import React from 'react';
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';
import ActionBase from './ActionBase';

interface RobActionProps {
  action: {
    action_type: string;
    description?: string;
    reason?: string;
    cost_of_action_points?: number;
    resource_id: string;
    quantity: number;
    target_agent_id?: string;
  };
}

const RobAction: React.FC<RobActionProps> = ({ action }) => {
  return (
    <ActionBase
      action={action}
      icon={<ArchiveBoxXMarkIcon className="h-6 w-6 text-purple-600" />}
      bgColor="bg-purple-50"
    >
      <div className="mt-2">
        <div className="flex items-center">
          <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md flex items-center">
            <span className="font-medium">{action.resource_id}</span>
            <span className="mx-1">×</span>
            <span className="bg-white px-1.5 py-0.5 rounded text-purple-700 font-semibold">
              {action.quantity}
            </span>
          </div>
        </div>
        
        {action.target_agent_id && (
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-600 mr-2">Target:</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md text-sm font-medium">
              Agent {action.target_agent_id}
            </span>
          </div>
        )}
        
        <div className="mt-2 text-xs text-purple-600 font-medium">
          ⚠️ This action may have negative consequences on reputation
        </div>
      </div>
    </ActionBase>
  );
};

export default RobAction; 