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
import { calculateMetrics, AgentHistoryPoint } from '../../../types/metrics';

export default function SimulationPage() {
  const params = useParams();
  const runId = params.runId as string;
  
  const [maxTimeStep, setMaxTimeStep] = useState(99);
  const [currentTimeStep, setCurrentTimeStep] = useState(1);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('grid');

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
  
  // Calculate metrics from checkpoint data
  const metrics = checkpoint ? calculateMetrics(checkpoint.data) : null;

  // Generate agent history data from all checkpoints
  const agentHistory = checkpoints?.map(cp => {
    const cpMetrics = calculateMetrics(cp.data);
    return {
      timeStep: cp.timeStep,
      moralAgents: cpMetrics?.moralAgents || 0,
      nonMoralAgents: cpMetrics?.nonMoralAgents || 0
    } as AgentHistoryPoint;
  }).sort((a, b) => a.timeStep - b.timeStep);

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
    <main className="p-4 bg-gray-100 min-h-screen">
      {/* Fixed Header with Back Button and Timeline Controls */}
      <header className="sticky top-0 z-10 bg-white shadow-md p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back
          </Link>
          <h1 className="text-xl font-bold">Simulation: {runId}</h1>
        </div>
        
        <TimelineControls
          currentTimeStep={currentTimeStep}
          maxTimeStep={maxTimeStep}
          onTimeStepChange={handleTimeStepChange}
        />
      </header>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
        {/* Left Column: Grid and Metrics */}
        <div className="lg:col-span-2">
          <SimulationGrid checkpoint={checkpoint} />
          <div className="mt-4">
            <MetricsPanel metrics={metrics} checkpoint={checkpoint} agentHistory={agentHistory} />
          </div>
        </div>
        
        {/* Right Column: Agent Details and Config */}
        <div className="lg:col-span-1">
          <AgentDetailsPanel
            agents={agents}
            selectedAgentId={selectedAgentId}
            onSelectAgent={setSelectedAgentId}
          />
          <div className="mt-4">
            {checkpoint?.data?.configuration && (
              <ConfigPanel config={checkpoint.data.configuration} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout with Tabs */}
      <div className="block lg:hidden">
        <div className="flex border-b mb-4">
          <button 
            className={`flex-1 px-4 py-2 text-center ${activeTab === 'grid' 
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
              : 'text-gray-600'}`}
            onClick={() => setActiveTab('grid')}
          >
            Grid
          </button>
          <button 
            className={`flex-1 px-4 py-2 text-center ${activeTab === 'agents' 
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
              : 'text-gray-600'}`}
            onClick={() => setActiveTab('agents')}
          >
            Agents
          </button>
          <button 
            className={`flex-1 px-4 py-2 text-center ${activeTab === 'metrics' 
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
              : 'text-gray-600'}`}
            onClick={() => setActiveTab('metrics')}
          >
            Metrics
          </button>
          <button 
            className={`flex-1 px-4 py-2 text-center ${activeTab === 'config' 
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
              : 'text-gray-600'}`}
            onClick={() => setActiveTab('config')}
          >
            Config
          </button>
        </div>
        
        <div className="mt-4">
          {activeTab === 'grid' && <SimulationGrid checkpoint={checkpoint} />}
          {activeTab === 'agents' && (
            <AgentDetailsPanel 
              agents={agents} 
              selectedAgentId={selectedAgentId} 
              onSelectAgent={setSelectedAgentId} 
            />
          )}
          {activeTab === 'metrics' && (
            <MetricsPanel 
              metrics={metrics} 
              checkpoint={checkpoint} 
              agentHistory={agentHistory} 
            />
          )}
          {activeTab === 'config' && checkpoint?.data?.configuration && (
            <ConfigPanel config={checkpoint.data.configuration} />
          )}
        </div>
      </div>

      {/* Loading and Error Messages */}
      {isLoading && <p className="mt-4">Loading checkpoint data...</p>}
      {error && <p className="mt-4 text-red-500">Error loading checkpoint data.</p>}
    </main>
  );
} 