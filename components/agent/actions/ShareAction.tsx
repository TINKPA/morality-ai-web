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
      <div className="mt-3 space-y-3">
        {/* Resource information */}
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Resource Shared</span>
          <div className="flex items-center">
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-md flex items-center shadow-sm">
              <span className="font-medium mr-2">{action.resource_id}</span>
              <div className="flex items-center">
                <span className="text-indigo-400 mx-1">×</span>
                <span className="bg-white px-2 py-0.5 rounded text-indigo-700 font-semibold">
                  {action.quantity}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recipient information */}
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Recipient</span>
          <div className="flex items-center">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-md text-sm font-medium shadow-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Agent {action.target_agent_id}
            </span>
          </div>
        </div>
      </div>
    </ActionBase>
  );
};

export default ShareAction; 