import React from 'react';
import { CheckpointData } from '../types/Checkpoint';
import CollapsiblePanel from './ui/CollapsiblePanel';

interface ObservationsPanelProps {
  checkpoint: CheckpointData | null;
}

const ObservationsPanel: React.FC<ObservationsPanelProps> = ({ checkpoint }) => {
  const observations = checkpoint?.observations || [];

  return (
    <CollapsiblePanel title="Observations" defaultOpen={true}>
      <div className="bg-white p-4 rounded-lg shadow-sm h-[calc(100vh-12rem)] overflow-y-auto">
        {observations.length > 0 ? (
          <div className="space-y-3">
            {observations.slice().reverse().map((observation, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded border border-gray-200">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{observation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <p className="text-lg font-medium">No observations available</p>
            <p className="mt-1 text-sm text-gray-400">There are no observations recorded for this time step</p>
          </div>
        )}
      </div>
    </CollapsiblePanel>
  );
};

export default ObservationsPanel; 