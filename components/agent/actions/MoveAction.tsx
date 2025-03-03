import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import ActionBase from './ActionBase';

interface MoveActionProps {
  action: {
    action_type: string;
    description?: string;
    reason?: string;
    cost_of_action_points?: number;
    path?: Array<{ x: number; y: number }>;
    current_location?: { x: number; y: number };
    target_location?: { x: number; y: number };
  };
}

const MoveAction: React.FC<MoveActionProps> = ({ action }) => {
  return (
    <ActionBase
      action={action}
      icon={<ArrowPathIcon className="h-6 w-6 text-blue-500" />}
      bgColor="bg-blue-50"
    >
      <div className="mt-2">
        {action.current_location && action.target_location && (
          <div className="text-sm text-gray-700">
            From ({action.current_location.x}, {action.current_location.y}) → 
            To ({action.target_location.x}, {action.target_location.y})
          </div>
        )}
        
        {action.path && action.path.length > 0 && (
          <div className="mt-1">
            <div className="text-xs text-gray-600 font-medium mb-1">Path:</div>
            <div className="flex flex-wrap gap-1 text-xs">
              {action.path.map((loc, index) => (
                <React.Fragment key={index}>
                  <span className="bg-blue-100 px-1.5 py-0.5 rounded">
                    ({loc.x}, {loc.y})
                  </span>
                  {index < action.path!.length - 1 && (
                    <span className="text-gray-400">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </ActionBase>
  );
};

export default MoveAction; 