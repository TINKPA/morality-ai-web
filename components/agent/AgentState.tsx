import React from 'react';
import { AgentStateProps } from '../../types/agent';

const AgentState: React.FC<AgentStateProps> = ({ state }) => {
  if (!state) return <p className="text-gray-500 italic">No state information available.</p>;

  // Filter out properties that are displayed separately
  const filteredState = Object.entries(state).filter(
    ([key]) => !['hp', 'age', 'location'].includes(key)
  );

  return (
    <div>
      {filteredState.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {filteredState.map(([key, value]) => {
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
            } else if (key === 'food_stock') {
              displayValue = (
                <div className="flex items-center">
                  <span className={`${Number(value) > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                    {value}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
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