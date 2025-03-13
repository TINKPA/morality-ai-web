import React from 'react';
import { AgentStateProps } from '../../types/agent';

const AgentState: React.FC<AgentStateProps> = ({ state }) => {
  if (!state) return <p className="text-gray-500 italic">No state information available.</p>;

  // Filter out properties that are displayed separately
  const filteredState = Object.entries(state).filter(
    ([key]) => !['hp', 'age', 'location'].includes(key)
  );

  return (
    <div className="space-y-4">
      {/* HP and Age - Always displayed prominently */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">HP</span>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${Math.min(100, (state.hp / 60) * 100)}%` }}
              ></div>
            </div>
            <span className="ml-2 font-medium">{state.hp}/60</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">Age</span>
          <span className="font-medium text-gray-800">{state.age} steps</span>
        </div>
      </div>
      
      {/* Location */}
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
        <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">Location</span>
        <div className="font-medium text-gray-800">
          ({state.location.x}, {state.location.y})
        </div>
      </div>
      
      {/* Reproduction Info */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">Reproduction Cooldown</span>
          <span className="font-medium text-gray-800">{state.reproduction_cooldown}</span>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">Parent ID</span>
          <span className="font-medium text-gray-800">{state.parent_id || 'None'}</span>
        </div>
      </div>

      {/* Other state properties */}
      {filteredState.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-3">
          {filteredState
            .filter(([key]) => !['reproduction_cooldown', 'parent_id'].includes(key))
            .map(([key, value]) => {
            // Format the value based on its type
            let displayValue: React.ReactNode;
            let valueClass = "font-medium text-gray-800";
            
            if (typeof value === 'boolean') {
              displayValue = (
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {value ? 'Yes' : 'No'}
                </span>
              );
              valueClass = "";
            } else if (typeof value === 'object' && value !== null) {
              displayValue = (
                <pre className="text-xs bg-gray-50 p-2 rounded border border-gray-200 overflow-auto max-h-24">
                  {JSON.stringify(value, null, 2)}
                </pre>
              );
              valueClass = "";
            } else if (key === 'reputation') {
              const repColor = Number(value) > 0 
                ? 'text-green-600' 
                : Number(value) < 0 
                  ? 'text-red-600' 
                  : 'text-gray-600';
              
              displayValue = <span className={`${repColor} font-medium`}>{value}</span>;
              valueClass = "";
            } else {
              displayValue = String(value);
            }
            
            return (
              <div key={key} className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  {key.replace(/_/g, ' ')}
                </span>
                <div className={valueClass}>
                  {displayValue}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AgentState; 