import React, { ReactNode } from 'react';

export interface ActionBaseProps {
  action: {
    action_type: string;
    description?: string;
    reason?: string;
    cost_of_action_points?: number;
    [key: string]: any;
  };
  icon: ReactNode;
  bgColor: string;
  children?: ReactNode;
}

const ActionBase: React.FC<ActionBaseProps> = ({ 
  action, 
  icon, 
  bgColor, 
  children 
}) => {
  return (
    <div className={`p-3 rounded-md ${bgColor} border border-opacity-50 shadow-sm`}>
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center">
            <span className="font-semibold capitalize text-gray-800 mr-2">
              {action.action_type}
            </span>
            
            {action.cost_of_action_points !== undefined && (
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                Cost: {action.cost_of_action_points} points
              </span>
            )}
          </div>
          
          {action.description && (
            <p className="text-sm text-gray-700 mt-1">
              {action.description}
            </p>
          )}
          
          {action.reason && (
            <div className="text-sm text-gray-600 mt-1 italic">
              Reason: {action.reason}
            </div>
          )}
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default ActionBase; 