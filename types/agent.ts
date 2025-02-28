export interface Agent {
  id: string;
  type: string;
  created_at_step: number | null;
  state: {
    hp: number;
    age: number;
    food_stock: number;
    location: { x: number; y: number };
    reputation: number;
    is_alive?: boolean;
  };
  attributes: { [key: string]: string | number };
  inventory: Array<{
    type: string;
    quantity: number;
    phase: string;
  }>;
  memory: {
    long_term_memory?: string;
    beliefs?: string[];
    received_messages?: [content: string];
  };
  action_history: Array<{
    at_time_step: number;
    reasoning: string;
    actions: Array<{
      action_type: string;
      target_location?: { x: number; y: number };
      reason?: string;
    }>;
  }>;
  logs: {
    prompts: {
      system_prompt: string;
      user_prompt: string;
    };
    response: string;
  };
}

export interface AgentDetailsPanelProps {
  agents: Agent[];
  selectedAgentId: string | null;
  onSelectAgent: (id: string) => void;
}

export interface AgentSelectorProps {
  agents: Agent[];
  selectedAgentId: string | null;
  defaultSelectedAgentId?: string | null;
  onSelectAgent: (agentId: string) => void;
}

export interface BasicInformationProps {
  agent: Agent;
}

export interface AgentStateProps {
  state: Agent['state'];
}

export interface RecentActionsProps {
  actionHistory: Agent['action_history'];
}

export interface PromptResponseSubWindowProps {
  prompt: string;
  response: string;
  onClose: () => void;
} 