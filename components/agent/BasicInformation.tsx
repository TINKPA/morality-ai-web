import React from 'react';
import { BasicInformationProps } from '../../types/agent';

const BasicInformation: React.FC<BasicInformationProps> = ({ agent }) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wide">ID</span>
          <span className="font-medium text-gray-800">{agent.id}</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Type</span>
          <span className="font-medium text-gray-800 capitalize">{agent.type}</span>
        </div>
      </div>
      
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 uppercase tracking-wide">Created at Step</span>
        <span className="font-medium text-gray-800">
          {agent.created_at_step !== null ? agent.created_at_step : 'N/A'}
        </span>
      </div>
      
      {Object.keys(agent.attributes).length > 0 && (
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">Attributes</span>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(agent.attributes).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-2 rounded border border-gray-200">
                <span className="text-xs text-gray-500 capitalize">{key}</span>
                <div className="font-medium text-gray-800">{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInformation; 