'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import TimelineControls from '../../../components/TimelineControls';
import SimulationGrid from '../../../components/SimulationGrid';
import AgentDetailsPanel from '../../../components/AgentDetailsPanel';
import MetricsPanel from '../../../components/MetricsPanel';
import ConfigPanel from '../../../components/ConfigPanel';
import Link from 'next/link';

export default function SimulationPage() {
  const params = useParams();
  const runId = params.runId as string;
  
  const [maxTimeStep, setMaxTimeStep] = useState(99);
  const [currentTimeStep, setCurrentTimeStep] = useState(1);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  // Fetch all checkpoints for the selected run
  const {
    data: checkpoints,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['checkpoints', runId],
    queryFn: async () => {
      if (!runId) return [];
      
      const response = await fetch(`/api/checkpoints/${runId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch checkpoint data');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // Keep data fresh for 5 minutes
  });

  // Get the current checkpoint based on currentTimeStep
  const checkpoint = checkpoints?.find(cp => cp.timeStep === currentTimeStep);

  // Update maxTimeStep when checkpoints are loaded
  useEffect(() => {
    if (checkpoints && checkpoints.length > 0) {
      const maxStep = Math.max(...checkpoints.map(cp => cp.timeStep));
      setMaxTimeStep(maxStep);
    }
  }, [checkpoints]);

  const handleTimeStepChange = (step: number | ((prev: number) => number)) => {
    if (typeof step === 'number') {
      setCurrentTimeStep(step);
    } else {
      setCurrentTimeStep((prev) => step(prev));
    }
  };
  
  const agents = checkpoint?.data?.social_environment?.agents || [];

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      {/* Header with Back Button */}
      <header className="mb-8 flex justify-between items-center">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to All Simulations
        </Link>
        <h1 className="text-2xl font-bold">
          Simulation: {runId}
        </h1>
      </header>

      {/* Timeline Controls */}
      <section className="mb-8">
        <TimelineControls
          currentTimeStep={currentTimeStep}
          maxTimeStep={maxTimeStep}
          onTimeStepChange={handleTimeStepChange}
        />
      </section>

      {/* Main Panels */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <SimulationGrid checkpoint={checkpoint} />
        </div>
        <div>
          <AgentDetailsPanel
            agents={agents}
            selectedAgentId={selectedAgentId}
            onSelectAgent={setSelectedAgentId}
          />
        </div>
      </section>

      {/* Bottom Panels */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <MetricsPanel metrics={checkpoint?.data?.statistics} />
        </div>
        <div>
          {checkpoint?.data?.configuration && (
            <ConfigPanel config={checkpoint.data.configuration} />
          )}
        </div>
      </section>

      {/* Loading and Error Messages */}
      {isLoading && <p className="mt-4">Loading checkpoint data...</p>}
      {error && <p className="mt-4 text-red-500">Error loading checkpoint data.</p>}
    </main>
  );
} 