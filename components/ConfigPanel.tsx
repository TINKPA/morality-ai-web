// components/ConfigPanel.tsx
import React from 'react';
import { Config } from '../types/config';

interface ConfigPanelProps {
  config: Config;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config }) => {
  if (!config) {
    return (
      <div className="p-4 border rounded shadow bg-white">
        <h3 className="text-xl font-bold mb-2">Configuration Panel</h3>
        <p>No configuration available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="text-xl font-bold mb-2">Configuration Panel</h3>
      {config.simulationName && <p><strong>Name:</strong> {config.simulationName}</p>}
      {config.version && <p><strong>Version:</strong> {config.version}</p>}
      {config.startDate && <p><strong>Date:</strong> {config.startDate}</p>}
      {config.maxTimeSteps !== undefined && <p><strong>Steps:</strong> {config.maxTimeSteps}</p>}
      {config.crisisFactor !== undefined && <p><strong>Crisis Factor:</strong> {config.crisisFactor}</p>}
      
      {config.gridDimensions && (
        <p><strong>Grid:</strong> {config.gridDimensions.width}x{config.gridDimensions.height}</p>
      )}
      
      {config.initialAgents !== undefined && <p><strong>Initial Agents:</strong> {config.initialAgents}</p>}
      
      {config.agentRatio && (
        <p>
          <strong>Agent Ratio:</strong> Moral: {config.agentRatio.moral * 100}% /
          Immoral: {config.agentRatio.immoral * 100}%
        </p>
      )}
      
      {config.resourceQuantities && (
        <p>
          <strong>Resources:</strong>{" "}
          {Object.entries(config.resourceQuantities)
            .map(([key, qty]) => `${key}:${qty}`)
            .join(", ")}
        </p>
      )}
      
      {config.randomSeed !== undefined && <p><strong>Seed:</strong> {config.randomSeed}</p>}
    </div>
  );
};

export default ConfigPanel;
