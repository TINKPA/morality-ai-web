// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import TimelineControls from '../components/TimelineControls';
import SimulationGrid from '../components/SimulationGrid';
import AgentDetailsPanel from '../components/AgentDetailsPanel';
import MetricsPanel from '../components/MetricsPanel';
import ConfigPanel from '../components/ConfigPanel';
import { useQuery } from '@tanstack/react-query';
import RunSelector from '../components/RunSelector';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const runIdFromUrl = searchParams.get('runId');
  
  const [maxTimeStep, setMaxTimeStep] = useState(99);
  const [currentTimeStep, setCurrentTimeStep] = useState(1);
  const [selectedRunId, setSelectedRunId] = useState<string>(runIdFromUrl || '');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  // Fetch checkpoint data via React Query
  const {
    data: checkpoint,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['checkpoint', selectedRunId, currentTimeStep],
    queryFn: async () => {
      const response = await fetch(`/api/checkpoints/${selectedRunId}/${currentTimeStep}`);
      if (!response.ok) {
        throw new Error('Failed to fetch checkpoint data');
      }
      return response.json();
    },
    keepPreviousData: true,
  });

  const handleTimeStepChange = (step: number | ((prev: number) => number)) => {
    if (typeof step === 'number') {
      setCurrentTimeStep(step);
    } else {
      setCurrentTimeStep((prev) => step(prev));
    }
  };
  const agents = checkpoint?.data?.social_environment?.agents || [];

  useEffect(() => {
    setMaxTimeStep(checkpoint?.data?.metadata?.total_time_steps);
  }, [checkpoint]);

  // Update selectedRunId if the URL parameter changes
  useEffect(() => {
    if (runIdFromUrl) {
      setSelectedRunId(runIdFromUrl);
    }
  }, [runIdFromUrl]);

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        {/* Run Selector UI */}
        <RunSelector selectedRunId={selectedRunId} onSelect={setSelectedRunId} />
      </header>

      {/* Timeline Controls */}
      <section className="mb-8">
        <TimelineControls
          currentTimeStep={currentTimeStep}
          maxTimeStep={checkpoint?.data?.metadata?.total_time_steps || maxTimeStep}
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
          {/* <ConfigPanel config={checkpoint?.configuration} /> */}
        </div>
      </section>

      {/* Loading and Error Messages */}
      {isLoading && <p className="mt-4">Loading checkpoint data...</p>}
      {error && <p className="mt-4 text-red-500">Error loading checkpoint data.</p>}
    </main>
  );
}
