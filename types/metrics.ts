export interface Metrics {
  totalAgents: number;
  moralAgents: number;
  nonMoralAgents: number;
  averageHP: number;
  maxHP: number;
  minHP: number;
}

export interface ResourceMetrics {
  totalResources: number;
  totalPlants: number;
  averagePlantsPerNode: number;
  plantPhaseDistribution: Record<string, number>;
}

export interface AgentHistoryPoint {
  timeStep: number;
  moralAgents: number;
  nonMoralAgents: number;
}

export interface MetricsPanelProps {
  metrics: Metrics | null;
  checkpoint?: any;
  agentHistory?: AgentHistoryPoint[];
}

import { Agent } from './agent';

/**
 * Calculates simulation metrics from checkpoint data
 * @param checkpointData The data from a simulation checkpoint
 * @returns Metrics object with calculated statistics
 */
export function calculateMetrics(checkpointData: any): Metrics | null {
  if (!checkpointData || !checkpointData.social_environment || !checkpointData.social_environment.agents) {
    console.log("No valid checkpoint data found");
    return null;
  }

  const agents: Agent[] = checkpointData.social_environment.agents;
  
  // Log the first agent to see its structure
  if (agents.length > 0) {
    console.log("Sample agent structure:", JSON.stringify(agents[0], null, 2));
    console.log("Agent types:", agents.map(agent => agent.type));
  }
  
  if (agents.length === 0) {
    console.log("No live agents found");
    return null;
  }

  // Count moral vs non-moral agents (assuming agent type contains this information)
  const moralAgents = agents.filter(agent => 
    agent.type?.toLowerCase() === 'moral').length;

  const nonMoralAgents = agents.length - moralAgents;

  // Calculate HP statistics
  const hpValues = agents.map(agent => agent.state.hp);
  console.log("HP values:", hpValues);
  
  const averageHP = hpValues.reduce((sum, hp) => sum + hp, 0) / hpValues.length;
  const maxHP = Math.max(...hpValues);
  const minHP = Math.min(...hpValues);
  console.log(`HP stats - Avg: ${averageHP.toFixed(2)}, Max: ${maxHP}, Min: ${minHP}`);

  return {
    totalAgents: agents.length,
    moralAgents,
    nonMoralAgents,
    averageHP,
    maxHP,
    minHP
  };
}

/**
 * Calculates resource metrics from checkpoint data
 * @param checkpointData The data from a simulation checkpoint
 * @returns ResourceMetrics object with calculated statistics
 */
export function calculateResourceMetrics(checkpointData: any): ResourceMetrics | null {
  if (!checkpointData || !checkpointData.physical_environment || !checkpointData.physical_environment.resources) {
    console.log("No valid resource data found");
    return null;
  }

  const resources = checkpointData.physical_environment.resources;
  
  if (resources.length === 0) {
    console.log("No resources found");
    return null;
  }

  // Log the first resource to see its structure
  if (resources.length > 0) {
    console.log("Sample resource structure:", JSON.stringify(resources[0], null, 2));
  }

  // Calculate total plants
  const totalPlants = resources.reduce((sum, resource) => sum + resource.quantity, 0);
  
  // Calculate plant phase distribution
  const plantPhaseDistribution: Record<string, number> = {};
  
  resources.forEach(resource => {
    const phase = resource.phase || 'unknown';
    if (!plantPhaseDistribution[phase]) {
      plantPhaseDistribution[phase] = 0;
    }
    plantPhaseDistribution[phase] += resource.quantity;
  });

  console.log("Plant phase distribution:", plantPhaseDistribution);

  return {
    totalResources: resources.length,
    totalPlants,
    averagePlantsPerNode: totalPlants / resources.length,
    plantPhaseDistribution
  };
}