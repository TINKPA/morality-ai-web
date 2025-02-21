// app/test.tsx
'use client';

import React, { useState } from 'react';
import AgentDetailsPanel, { Agent } from '../../components/AgentDetailsPanel';

const sampleAgents: Agent[] = [
  {
    id: 'agent1',
    type: 'example',
    created_at_step: 1,
    state: {
      hp: 100,
      age: 5,
      food_stock: 10,
      location: { x: 50, y: 100 },
      reputation: 10,
      is_alive: true,
    },
    attributes: { strength: 10, speed: 5 },
    inventory: [{ type: 'item', quantity: 1, phase: 'new' }],
    memory: {
      long_term_memory: undefined,
      beliefs: ['belief1', 'belief2'],
      received_messages: ['msg1', 'msg2']
    },
    action_history: [
      { at_time_step: 1, reasoning: 'Created agent', actions: [] }
    ],
    promptData: '## Example Prompt\nSome **markdown** text for the prompt.',
    responseData: '## Example Response\nSome **markdown** text for the response.'
  },
  {
    id: 'agent2',
    type: 'sample',
    created_at_step: 2,
    state: {
      hp: 80,
      age: 3,
      food_stock: 5,
      location: { x: 150, y: 200 },
      reputation: 8,
      is_alive: true,
    },
    attributes: { intelligence: 7, agility: 9 },
    inventory: [{ type: 'resource', quantity: 3, phase: 'used' }],
    memory: {
      long_term_memory: undefined,
      beliefs: ['beliefA', 'beliefB'],
      received_messages: ['msgA', 'msgB']
    },
    action_history: [
      { at_time_step: 2, reasoning: 'Initialized agent', actions: [] }
    ],
    promptData: '## Agent2 Prompt\nContent with **markdown** formatting.',
    responseData: '## Agent2 Response\nMore detailed **markdown** content.'
  }
];

export default function TestPage() {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  return (
    <div className="container mx-auto mt-8">
      <AgentDetailsPanel
        agents={sampleAgents}
        selectedAgentId={selectedAgentId}
        onSelectAgent={(id) => setSelectedAgentId(id)}
      />
    </div>
  );
}
