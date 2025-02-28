export interface Config {
  simulationName?: string;
  version?: string;
  startDate?: string;
  maxTimeSteps?: number;
  crisisFactor?: number;
  gridDimensions?: { width: number; height: number };
  initialAgents?: number;
  agentRatio?: { moral: number; immoral: number };
  resourceQuantities?: Record<string, number>;
  randomSeed?: number;
} 