// components/ConfigPanel.tsx
import React from 'react';

interface Config {
  simulationName: string;
  version: string;
  startDate: string;
  maxTimeSteps: number;
  crisisFactor: number;
  gridDimensions: { width: number; height: number };
  initialAgents: number;
  agentRatio: { moral: number; immoral: number };
  resourceQuantities: Record<string, number>;
  randomSeed: number;
}

interface ConfigPanelProps {
  config: Config;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config }) => (
  <div className="p-4 border rounded shadow bg-white">
    <h3 className="text-xl font-bold mb-2">Configuration Panel</h3>
    <p><strong>Name:</strong> {config.simulationName}</p>
    <p><strong>Version:</strong> {config.version}</p>
    <p><strong>Date:</strong> {config.startDate}</p>
    <p><strong>Steps:</strong> {config.maxTimeSteps}</p>
    <p><strong>Crisis Factor:</strong> {config.crisisFactor}</p>
    <p><strong>Grid:</strong> {config.gridDimensions.width}x{config.gridDimensions.height}</p>
    <p><strong>Initial Agents:</strong> {config.initialAgents}</p>
    <p>
      <strong>Agent Ratio:</strong> Moral: {config.agentRatio.moral * 100}% /
      Immoral: {config.agentRatio.immoral * 100}%
    </p>
    <p>
      <strong>Resources:</strong>{" "}
      {Object.entries(config.resourceQuantities)
        .map(([key, qty]) => `${key}:${qty}`)
        .join(", ")}
    </p>
    <p><strong>Seed:</strong> {config.randomSeed}</p>
  </div>
);

export default ConfigPanel;
