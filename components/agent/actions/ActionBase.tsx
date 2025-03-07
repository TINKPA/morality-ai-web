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
    <div className={`p-4 rounded-lg ${bgColor} border border-opacity-50 shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start">
        <div className="mr-3 p-2 rounded-full bg-white bg-opacity-70 shadow-sm">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center mb-1">
            <span className="font-semibold capitalize text-gray-800 mr-2 text-lg">
              {action.action_type}
            </span>
            
            {action.cost_of_action_points !== undefined && (
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-medium">
                Cost: {action.cost_of_action_points} points
              </span>
            )}
          </div>
          
          {action.description && (
            <p className="text-sm text-gray-700 mb-2 leading-relaxed">
              {action.description}
            </p>
          )}
          
          {action.reason && (
            <div className="text-sm text-gray-600 mb-2 p-2 bg-white bg-opacity-50 rounded border-l-2 border-gray-400 italic">
              <span className="font-medium text-gray-700">Reason:</span> {action.reason}
            </div>
          )}
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default ActionBase; 