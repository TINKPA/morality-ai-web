import React from 'react';
import { HandRaisedIcon } from '@heroicons/react/24/outline';
import ActionBase from './ActionBase';

interface CollectActionProps {
  action: {
    action_type: string;
    description?: string;
    reason?: string;
    cost_of_action_points?: number;
    resource_id: string;
    quantity: number;
  };
}

const CollectAction: React.FC<CollectActionProps> = ({ action }) => {
  return (
    <ActionBase
      action={action}
      icon={<HandRaisedIcon className="h-6 w-6 text-green-500" />}
      bgColor="bg-green-50"
    >
      <div className="mt-2 flex items-center">
        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md flex items-center">
          <span className="font-medium">{action.resource_id}</span>
          <span className="mx-1">×</span>
          <span className="bg-white px-1.5 py-0.5 rounded text-green-700 font-semibold">
            {action.quantity}
          </span>
        </div>
      </div>
    </ActionBase>
  );
};

export default CollectAction; 