// components/AgentDetailsPanel.tsx
import React from 'react';

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
    received_messages?: Array<{ from: string; to: string; content: string }>;
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
}

interface AgentDetailsPanelProps {
  agent?: Agent;
}

const AgentDetailsPanel: React.FC<AgentDetailsPanelProps> = ({ agent }) => {
  if (!agent) {
    return <div className="p-4">No agent selected.</div>;
  }

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="text-xl font-bold mb-2">Agent Details: {agent.id}</h3>

      {/* Basic Information */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Basic Information</h4>
        <p><strong>ID:</strong> {agent.id}</p>
        <p><strong>Type:</strong> {agent.type}</p>
        <p><strong>Created at Step:</strong> {agent.created_at_step ?? 'N/A'}</p>
      </div>

      {/* State */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold">State</h4>
        <p><strong>HP:</strong> {agent.state.hp}</p>
        <p><strong>Age:</strong> {agent.state.age}</p>
        <p><strong>Food Stock:</strong> {agent.state.food_stock}</p>
        <p>
          <strong>Location:</strong> ({agent.state.location.x}, {agent.state.location.y})
        </p>
        <p><strong>Reputation:</strong> {agent.state.reputation.toFixed(2)}</p>
        {agent.state.is_alive !== undefined && (
          <p>
            <strong>Alive:</strong> {agent.state.is_alive ? 'Yes' : 'No'}
          </p>
        )}
      </div>

      {/* Attributes */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Attributes</h4>
        {Object.entries(agent.attributes).map(([key, value]) => (
          <p key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
          </p>
        ))}
      </div>

      {/* Inventory */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Inventory</h4>
        {agent.inventory && agent.inventory.length > 0 ? (
          agent.inventory.map((item, index) => (
            <p key={index}>
              <strong>Qty:</strong> {item.quantity} <strong>Type:</strong> {item.type} <strong>Phase:</strong> {item.phase}
            </p>
          ))
        ) : (
          <p>Empty</p>
        )}
      </div>

      {/* Memory */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Memory</h4>
        <p>
          <strong>Long Term Memory:</strong> {agent.memory.long_term_memory || 'None'}
        </p>
        {agent.memory.beliefs && (
          <div>
            <strong>Beliefs:</strong>
            <ul className="list-disc list-inside">
              {agent.memory.beliefs.map((belief, index) => (
                <li key={index}>{belief}</li>
              ))}
            </ul>
          </div>
        )}
        {agent.memory.received_messages && (
          <div>
            <strong>Recent Messages:</strong>
            <ul className="list-disc list-inside">
              {agent.memory.received_messages.map((msg, index) => (
                <li key={index}>
                  [{msg.from} → {msg.to}]: "{msg.content}"
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Recent Actions */}
      <div>
        <h4 className="text-lg font-semibold">Recent Actions</h4>
        {agent.action_history && agent.action_history.length > 0 ? (
          agent.action_history.map((action, index) => (
            <div key={index} className="mb-2">
              <p>
                <strong>Step {action.at_time_step}:</strong> {action.reasoning}
              </p>
              {action.actions && action.actions.length > 0 && (
                <ul className="list-disc list-inside">
                  {action.actions.map((act, i) => (
                    <li key={i}>
                      <strong>Action:</strong> {act.action_type}
                      {act.target_location &&
                        ` → (${act.target_location.x}, ${act.target_location.y})`}
                      {act.reason && <div><strong>Reason:</strong> {act.reason}</div>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p>No actions recorded.</p>
        )}
      </div>
    </div>
  );
};

export default AgentDetailsPanel;
