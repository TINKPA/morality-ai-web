import React from 'react';
import { FireIcon } from '@heroicons/react/24/outline';
import ActionBase from './ActionBase';

interface ConsumeActionProps {
  action: {
    action_type: string;
    description?: string;
    reason?: string;
    cost_of_action_points?: number;
    resource_id: string;
    quantity: number;
  };
}

const ConsumeAction: React.FC<ConsumeActionProps> = ({ action }) => {
  return (
    <ActionBase
      action={action}
      icon={<FireIcon className="h-6 w-6 text-orange-500" />}
      bgColor="bg-orange-50"
    >
      <div className="mt-2">
        <div className="flex items-center">
          <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-md flex items-center">
            <span className="font-medium">{action.resource_id}</span>
            <span className="mx-1">×</span>
            <span className="bg-white px-1.5 py-0.5 rounded text-orange-700 font-semibold">
              {action.quantity}
            </span>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Consumed from inventory
        </div>
      </div>
    </ActionBase>
  );
};

export default ConsumeAction; 