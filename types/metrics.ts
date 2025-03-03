export interface Metrics {
  totalAgents: number;
  moralAgents: number;
  nonMoralAgents: number;
  averageHP: number;
  maxHP: number;
  minHP: number;
}

export interface MetricsPanelProps {
  metrics: Metrics | null;
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
    // console.log("Sample agent structure:", JSON.stringify(agents[0], null, 2));
    // console.log("Agent types:", agents.map(agent => agent.type));
  }
  
  if (agents.length === 0) {
    console.log("No live agents found");
    return null;
  }

  // Count moral vs non-moral agents (assuming agent type contains this information)
  const moralAgents = agents.filter(agent => 
    agent.type.toLowerCase() == 'moral').length;

  const nonMoralAgents = agents.length - moralAgents;

  // Calculate HP statistics
  const hpValues = agents.map(agent => agent.state.hp);
  // console.log("HP values:", hpValues);
  
  const averageHP = hpValues.reduce((sum, hp) => sum + hp, 0) / hpValues.length;
  const maxHP = Math.max(...hpValues);
  const minHP = Math.min(...hpValues);
  // console.log(`HP stats - Avg: ${averageHP.toFixed(2)}, Max: ${maxHP}, Min: ${minHP}`);

  return {
    totalAgents: agents.length,
    moralAgents,
    nonMoralAgents,
    averageHP,
    maxHP,
    minHP
  };
}