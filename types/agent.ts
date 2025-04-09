// Agent Types
export interface AgentState {
  hp: number;
  age: number;
  location: {
    x: number;
    y: number;
  };
  parent_id: string | null;
}

/**
 * Represents an agent's memory and observations.
 * 
 * This includes:
 * - Observations from the environment
 * - Memory of past events
 * - Received messages from other agents
 * - Agent-specific memory (e.g., hunting history)
 * - Planning information for future actions
 */
export interface AgentMemory {
  memory: string;
  observations: string[];
  received_messages: string[];
  agent_specific_memory: Record<string, any>;
  planning: string;
}

export interface AgentInventoryItem {
  quantity: number;
  resource_id: string;
}

// Action Types
export interface ActionBase {
  action_type: string;
  reason: string;
}

export interface MoveAction extends ActionBase {
  action_type: "move";
  current_location: {
    x: number;
    y: number;
  };
  target_location: {
    x: number;
    y: number;
  };
}

export interface CollectAction extends ActionBase {
  action_type: "collect";
  resource_id: string;
}

export interface ConsumeAction extends ActionBase {
  action_type: "consume";
  resource_id: string;
}

export interface ShareAction extends ActionBase {
  action_type: "share";
  resource_id: string;
  target_agent_id: string;
}

export interface AttackAction extends ActionBase {
  action_type: "attack";
  target_id: string;
  target_type: "agent" | "prey";
}

export interface RobAction extends ActionBase {
  action_type: "rob";
  resource_id: string;
  target_agent_id: string;
}

export interface ReproduceAction extends ActionBase {
  action_type: "reproduce";
}

export interface CommunicateAction extends ActionBase {
  action_type: "communicate";
  target_agent_id: string;
  message: string;
}

export interface DoNothingAction extends ActionBase {
  action_type: "do_nothing";
}

export type AgentAction = 
  | MoveAction 
  | CollectAction 
  | ConsumeAction 
  | ShareAction 
  | AttackAction 
  | RobAction 
  | ReproduceAction 
  | CommunicateAction 
  | DoNothingAction;

export interface Agent {
  id: string;
  logs: {
    messages: string[] | null;
    prompts?: {
      system_prompt: string;
      user_prompt: string;
    };
    response?: string;
  };
  type: 'moral' | 'immoral';
  state: AgentState;
  memory: AgentMemory;
  inventory: AgentInventoryItem[];
  action_history: AgentAction[];
}

// Component Props Types
export interface AgentDetailsPanelProps {
  agents: Agent[];
  selectedAgentId: string | null;
  onSelectAgent: (agentId: string | null) => void;
  metadata?: {
    current_agent_index: number;
    excution_queue: string[];
  };
}

export interface AgentSelectorProps {
  agents: Agent[];
  selectedAgentId: string | null;
  onSelectAgent: (agentId: string) => void;
}

export interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onClick: () => void;
}

export interface AgentStatsProps {
  agent: Agent;
}

export interface AgentInventoryProps {
  inventory: AgentInventoryItem[];
}

export interface AgentMemoryProps {
  memory: AgentMemory;
}

export interface AgentActionHistoryProps {
  actions: AgentAction[];
}

export interface BasicInformationProps {
  agent: Agent;
}

export interface AgentStateProps {
  state: Agent['state'];
}

export interface PromptResponseSubWindowProps {
  prompt: string;
  response: string;
  onClose: () => void;
} 