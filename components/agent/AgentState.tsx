import React from 'react';
import { AgentStateProps } from '../../types/agent';

const AgentState: React.FC<AgentStateProps> = ({ state }) => {
  if (!state) return <p>No state information available.</p>;

  return (
    <div className="mb-4">
      <h4 className="text-lg font-semibold">State</h4>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(state).map(([key, value]) => {
          // Skip location as it's displayed separately
          if (key === 'location') return null;
          
          // Format the value based on its type
          let displayValue: React.ReactNode;
          if (typeof value === 'object' && value !== null) {
            displayValue = <pre>{JSON.stringify(value, null, 2)}</pre>;
          } else {
            displayValue = String(value);
          }
          
          return (
            <div key={key} className="col-span-1">
              <strong>{key}:</strong> {displayValue}
            </div>
          );
        })}
      </div>
      
      {/* Display location separately */}
      {state.location && (
        <div className="mt-2">
          <strong>Location:</strong> ({state.location.x}, {state.location.y})
        </div>
      )}
    </div>
  );
};

export default AgentState; 