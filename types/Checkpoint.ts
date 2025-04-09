import { Agent } from './agent';

// Logs and Events
export interface Logs {
  debug_logs: string[];
  error_logs: string[];
}

export interface Events {
  action_logs: string[];
  global_events: string[];
}

// Metadata
export interface CheckpointMetadata {
  run_id: string;
  version: string;
  start_date: string;
  description: string;
  excution_queue: string[];
  simulation_name: string;
  total_time_steps: number;
  current_time_step: number;
  current_agent_index: number;
}

// Configuration
export interface AIConfig {
  model: string;
  provider: string;
  max_retries: number;
}

export interface ResourceDefinition {
  type: string;
  regrow_time: number;
  max_quantity: number;
}

export interface SimulationDimensions {
  width: number;
  height: number;
}

export interface SimulationParameters {
  dimensions: SimulationDimensions;
  initial_agents: number;
  initial_resources: number;
  crisis_probability: number;
  max_inventory_size: number;
}

export interface TerminationConditions {
  min_agents: number;
  max_time_steps: number;
  max_crisis_level: number;
}

export interface Configuration {
  version: string;
  ai_config: AIConfig;
  start_date: string | null;
  description: string;
  random_seed: number;
  simulation_name: string;
  resource_definitions: ResourceDefinition[];
  simulation_parameters: SimulationParameters;
  termination_conditions: TerminationConditions;
  initial_resource_quantities: Record<string, number>;
}

// Environment
export interface Location {
  x: number;
  y: number;
}

export interface Resource {
  id: string;
  location: Location;
  quantity: number;
  regrow_time_remaining: number;
}

export interface Crisis {
  level: number;
  affected_areas: any[];
  crisis_probability: number;
}

export interface PhysicalEnvironment {
  crisis: Crisis;
  resources: Resource[];
  dimensions: [number, number];
}

export interface SocialEnvironment {
  agents: Agent[];
  cemetery: any[];
  dimensions: [number, number];
  relationships: Record<string, any>;
}

/**
 * Represents a complete simulation state checkpoint.
 * 
 * This class manages all aspects of the simulation state, including:
 * - Physical environment (resources, crisis)
 * - Social environment (agents)
 * - Metadata (simulation info, timing)
 * - Logging and events
 * - Configuration
 */
export interface CheckpointData {
  metadata?: CheckpointMetadata;
  physical_environment?: PhysicalEnvironment;
  social_environment?: SocialEnvironment;
  events?: Events;
  logs?: Logs;
  configuration?: Configuration;
  observations: string[];
}

export interface Checkpoint {
  id: number;
  runId: string;
  createdAt: string;
  visible: boolean;
  checkpoint: CheckpointData;
}
