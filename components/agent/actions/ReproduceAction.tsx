import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import ActionBase from './ActionBase';

interface ReproduceActionProps {
  action: {
    action_type: string;
    description?: string;
    reason?: string;
    cost_of_action_points?: number;
  };
}

const ReproduceAction: React.FC<ReproduceActionProps> = ({ action }) => {
  return (
    <ActionBase
      action={action}
      icon={<HeartIcon className="h-6 w-6 text-pink-500" />}
      bgColor="bg-pink-50"
    >
      <div className="mt-2">
        <div className="bg-pink-100 text-pink-800 px-2 py-1 rounded-md inline-block">
          Creating new agent
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Requires agent age &gt; 4
        </div>
      </div>
    </ActionBase>
  );
};

export default ReproduceAction; 