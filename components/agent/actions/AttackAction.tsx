import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import ActionBase from './ActionBase';

interface AttackActionProps {
  action: {
    action_type: string;
    description?: string;
    reason?: string;
    cost_of_action_points?: number;
    target_agent_id: string;
  };
}

const AttackAction: React.FC<AttackActionProps> = ({ action }) => {
  return (
    <ActionBase
      action={action}
      icon={<ExclamationTriangleIcon className="h-6 w-6 text-red-600" />}
      bgColor="bg-red-50"
    >
      <div className="mt-2">
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Target:</span>
          <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-md text-sm font-medium">
            Agent {action.target_agent_id}
          </span>
        </div>
        <div className="mt-2 text-xs text-red-600 font-medium">
          ⚠️ This action may have negative consequences on reputation
        </div>
      </div>
    </ActionBase>
  );
};

export default AttackAction; 