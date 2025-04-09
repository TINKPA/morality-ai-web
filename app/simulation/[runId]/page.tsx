'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import TimelineControls from '../../../components/TimelineControls';
import SimulationGrid from '../../../components/SimulationGrid';
import AgentDetailsPanel from '../../../components/AgentDetailsPanel';
import MetricsPanel from '../../../components/MetricsPanel';
import ConfigPanel from '../../../components/ConfigPanel';
import ObservationsPanel from '../../../components/ObservationsPanel';
import Link from 'next/link';
import { calculateMetrics, AgentHistoryPoint } from '../../../types/metrics';
import { Agent } from '../../../types/agent';
import { Checkpoint } from '../../../types/Checkpoint';

export default function SimulationPage() {
  const params = useParams();
  const runId = params.runId as string;
  
  const [currentTimeStep, setCurrentTimeStep] = useState(1);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('grid');

  // Fetch all checkpoints for this run
  const {
    data: checkpoints,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['checkpoints', runId],
    queryFn: async () => {
      if (!runId) return null;
      
      const response = await fetch(`/api/checkpoints/${runId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch simulation data');
      }
      const data = await response.json();
      console.log(`Fetched ${data.length} checkpoints`);
      const checkpoints = data as Checkpoint[];
      console.log(`Fetched ${checkpoints.length} checkpoints`);

      return checkpoints;
    },
    staleTime: 5 * 60 * 1000, // Keep data fresh for 5 minutes
  });

  // Get the current checkpoint based on timeStep
  const currentCheckpoint = checkpoints?.[currentTimeStep - 1];
  const checkpoint = currentCheckpoint?.checkpoint;
  
  // Calculate metrics from checkpoint data
  const metrics = checkpoint ? calculateMetrics(checkpoint) : null;

  // Generate agent history data from all checkpoints
  const agentHistory: AgentHistoryPoint[] = checkpoints?.map((cp, index) => {
    const cpMetrics = calculateMetrics(cp.checkpoint);
    return {
      timeStep: index + 1,
      moralAgents: cpMetrics?.moralAgents || 0,
      nonMoralAgents: cpMetrics?.nonMoralAgents || 0
    };
  }) || [];

  // Get the current agents
  const agents = checkpoint?.social_environment?.agents || [];

  // Add keyboard event listener for arrow key navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Left/Right arrows for timeline navigation
      if (event.key === 'ArrowLeft') {
        // Go to previous step if not at the beginning
        if (currentTimeStep > 1) {
          setCurrentTimeStep(prev => prev - 1);
        }
      } else if (event.key === 'ArrowRight') {
        // Go to next step if not at the end
        if (currentTimeStep < (checkpoints?.length || 0)) {
          setCurrentTimeStep(prev => prev + 1);
        }
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentTimeStep, checkpoints]);

  return (
    <main className="container mx-auto p-4">
      <header className="sticky top-0 z-10 bg-white shadow-sm mb-2">
        <div className="flex items-center justify-between p-1">
          <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
            ← Back
          </Link>
          <h1 className="text-base font-bold truncate mx-2 text-center flex-1">Simulation: {runId}</h1>
        </div>
        
        <div className="px-1 pb-1 max-w-3xl mx-auto">
          <TimelineControls
            currentTimeStep={currentTimeStep}
            maxTimeStep={checkpoints?.length || 1}
            onTimeStepChange={setCurrentTimeStep}
          />
          <div className="text-xs text-gray-500 text-center mt-0.5">
            Use ← → keys to navigate steps
          </div>
        </div>
      </header>

      {/* Desktop Layout - Centered with max width */}
      <div className="hidden lg:block max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-2">
          {/* Left Column: Observations */}
          <div className="col-span-1 h-[calc(100vh-8rem)]">
            <ObservationsPanel checkpoint={checkpoint || null} />
          </div>
          
          {/* Middle Column: Grid and Metrics */}
          <div className="col-span-2 h-[calc(100vh-8rem)]">
            <div className="h-full flex flex-col">
              <div className="flex-1">
                <SimulationGrid checkpoint={checkpoint} />
              </div>
              <div className="mt-2">
                <MetricsPanel metrics={metrics} checkpoint={checkpoint || null} agentHistory={agentHistory} />
              </div>
            </div>
          </div>
          
          {/* Right Column: Agent Details and Config */}
          <div className="col-span-1 h-[calc(100vh-8rem)]">
            <div className="h-full flex flex-col">
              <div className="flex-1">
                <AgentDetailsPanel
                  agents={agents}
                  selectedAgentId={selectedAgentId}
                  onSelectAgent={setSelectedAgentId}
                  metadata={checkpoint?.metadata}
                />
              </div>
              <div className="mt-2">
                {checkpoint?.configuration && (
                  <ConfigPanel config={checkpoint.configuration} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout with Tabs - Centered */}
      <div className="block lg:hidden max-w-xl mx-auto">
        <div className="flex border-b mb-2">
          <button 
            className={`flex-1 px-2 py-1 text-center text-sm ${activeTab === 'grid' 
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
              : 'text-gray-600'}`}
            onClick={() => setActiveTab('grid')}
          >
            Grid
          </button>
          <button 
            className={`flex-1 px-2 py-1 text-center text-sm ${activeTab === 'agents' 
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
              : 'text-gray-600'}`}
            onClick={() => setActiveTab('agents')}
          >
            Agents
          </button>
          <button 
            className={`flex-1 px-2 py-1 text-center text-sm ${activeTab === 'metrics' 
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
              : 'text-gray-600'}`}
            onClick={() => setActiveTab('metrics')}
          >
            Metrics
          </button>
          <button 
            className={`flex-1 px-2 py-1 text-center text-sm ${activeTab === 'observations' 
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
              : 'text-gray-600'}`}
            onClick={() => setActiveTab('observations')}
          >
            Observations
          </button>
          <button 
            className={`flex-1 px-2 py-1 text-center text-sm ${activeTab === 'config' 
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
              : 'text-gray-600'}`}
            onClick={() => setActiveTab('config')}
          >
            Config
          </button>
        </div>
        
        <div className="mt-2">
          {activeTab === 'grid' && <SimulationGrid checkpoint={checkpoint} />}
          {activeTab === 'agents' && (
            <AgentDetailsPanel 
              agents={agents} 
              selectedAgentId={selectedAgentId} 
              onSelectAgent={setSelectedAgentId}
              metadata={checkpoint?.metadata}
            />
          )}
          {activeTab === 'metrics' && (
            <MetricsPanel 
              metrics={metrics} 
              checkpoint={checkpoint || null} 
              agentHistory={agentHistory} 
            />
          )}
          {activeTab === 'observations' && (
            <ObservationsPanel checkpoint={checkpoint || null} />
          )}
          {activeTab === 'config' && checkpoint?.configuration && (
            <ConfigPanel config={checkpoint.configuration} />
          )}
        </div>
      </div>

      {/* Loading and Error Messages - Centered */}
      <div className="text-center">
        {isLoading && <p className="mt-2 text-sm">Loading simulation data...</p>}
        {error && <p className="mt-2 text-sm text-red-500">Error loading simulation data.</p>}
      </div>
    </main>
  );
} 