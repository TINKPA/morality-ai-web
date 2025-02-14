// app/page.tsx
import React from 'react';
import SimulationGrid from '../components/SimulationGrid';
import AgentDetailsPanel, { Agent } from '../components/AgentDetailsPanel';
import MetricsPanel from '../components/MetricsPanel';
import ConfigPanel from '../components/ConfigPanel';

export default function Home() {
  // Dummy data for demonstration purposes
  const dummyAgent: Agent = {
    id: "A1",
    type: "Immoral",
    created_at_step: 0,
    state: {
      hp: 16,
      age: 1,
      food_stock: 10,
      location: { x: 9, y: 0 },
      reputation: 0.7,
      is_alive: true,
    },
    attributes: {
      strength: 9,
    },
    inventory: [
      { type: "ripe plants", quantity: 10, phase: "ripe" },
    ],
    memory: {
      long_term_memory: "Remembering initial conditions",
      beliefs: ["I need to gather resources"],
      received_messages: [{ from: "A1", to: "A2", content: "I need resources!" }],
    },
    action_history: [
      {
        at_time_step: 1,
        reasoning: "Moved to resource area",
        actions: [
          {
            action_type: "Move",
            target_location: { x: 9, y: 0 },
          },
        ],
      },
    ],
  };

  const dummyMetrics = {
    totalAgents: 50,
    moralAgents: 30,
    nonMoralAgents: 20,
    averageHP: 15.2,
    maxHP: 20,
    minHP: 5,
    averageReputation: 0.65,
    maxReputation: 0.9,
    minReputation: 0.2,
  };

  const dummyConfig = {
    simulationName: "ResourceAndMoralitySimulation",
    version: "1.0",
    startDate: "2025-02-14",
    maxTimeSteps: 6,
    crisisFactor: 20,
    gridDimensions: { width: 16, height: 16 },
    initialAgents: 50,
    agentRatio: { moral: 0.6, immoral: 0.4 },
    resourceQuantities: { P1: 5, P2: 9, P3: 1 },
    randomSeed: 12345,
  };

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Morality-AI-Web</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SimulationGrid />
        <AgentDetailsPanel agent={dummyAgent} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <MetricsPanel metrics={dummyMetrics} />
        <ConfigPanel config={dummyConfig} />
      </div>
    </main>
  );
}
