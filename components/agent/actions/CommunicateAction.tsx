import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import ActionBase from './ActionBase';

interface CommunicateActionProps {
  action: {
    action_type: string;
    description?: string;
    reason?: string;
    cost_of_action_points?: number;
    target_agent_id: string;
    message: string;
  };
}

const CommunicateAction: React.FC<CommunicateActionProps> = ({ action }) => {
  return (
    <ActionBase
      action={action}
      icon={<ChatBubbleLeftRightIcon className="h-6 w-6 text-cyan-500" />}
      bgColor="bg-cyan-50"
    >
      <div className="mt-2">
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">To:</span>
          <span className="bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-md text-sm font-medium">
            Agent {action.target_agent_id}
          </span>
        </div>
        
        <div className="mt-2 p-2 bg-white border border-cyan-200 rounded-lg shadow-sm">
          <div className="text-sm text-gray-800 italic">
            "{action.message}"
          </div>
        </div>
      </div>
    </ActionBase>
  );
};

export default CommunicateAction; 