import { CheckpointData, Resource } from './Checkpoint';

export interface Metrics {
  totalAgents: number;
  moralAgents: number;
  nonMoralAgents: number;
  averageHP: number;
  minHP: number;
  maxHP: number;
  totalResources: number;
  averageResources: number;
  crisisLevel: number;
}

export interface ResourceMetrics {
  totalQuantity: number;
  averageQuantity: number;
  minQuantity: number;
  maxQuantity: number;
}

export interface AgentHistoryPoint {
  timeStep: number;
  moralAgents: number;
  nonMoralAgents: number;
}

export interface MetricsPanelProps {
  metrics: Metrics | null;
  checkpoint: CheckpointData | null;
  agentHistory: AgentHistoryPoint[];
}

import { Agent } from './agent';

/**
 * Calculates simulation metrics from checkpoint data
 * @param checkpointData The data from a simulation checkpoint
 * @returns Metrics object with calculated statistics
 */
export function calculateMetrics(checkpoint: CheckpointData): Metrics {
  const agents = checkpoint.social_environment.agents;
  const resources = checkpoint.physical_environment.resources;
  const crisis = checkpoint.physical_environment.crisis;

  // Calculate agent metrics
  const totalAgents = agents.length;
  const moralAgents = agents.filter(a => a.type === 'moral').length;
  const nonMoralAgents = agents.filter(a => a.type === 'immoral').length;

  // Calculate HP metrics
  const hps = agents.map(a => a.state.hp);
  const averageHP = hps.length > 0 ? hps.reduce((a, b) => a + b, 0) / hps.length : 0;
  const minHP = hps.length > 0 ? Math.min(...hps) : 0;
  const maxHP = hps.length > 0 ? Math.max(...hps) : 0;

  // Calculate resource metrics
  const totalResources = resources.reduce((sum, r) => sum + r.quantity, 0);
  const averageResources = resources.length > 0 ? totalResources / resources.length : 0;

  return {
    totalAgents,
    moralAgents,
    nonMoralAgents,
    averageHP,
    minHP,
    maxHP,
    totalResources,
    averageResources,
    crisisLevel: crisis.level
  };
}

/**
 * Calculate metrics for resources
 * @param resources Array of resources with quantity property
 * @returns ResourceMetrics object with calculated statistics
 */
export function calculateResourceMetrics(resources: Resource[]): ResourceMetrics {
  const quantities = resources?.map(r => r.quantity);
  const totalQuantity = quantities?.reduce((sum, q) => sum + q, 0);
  const averageQuantity = quantities?.length > 0 ? totalQuantity / quantities?.length : 0;
  const minQuantity = quantities?.length > 0 ? Math.min(...quantities) : 0;
  const maxQuantity = quantities?.length > 0 ? Math.max(...quantities) : 0;

  return {
    totalQuantity,
    averageQuantity,
    minQuantity,
    maxQuantity
  };
}