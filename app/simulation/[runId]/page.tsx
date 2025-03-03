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

  // Get the current agents
  const agents = checkpoint?.data?.social_environment?.agents || [];

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
        if (currentTimeStep < maxTimeStep) {
          setCurrentTimeStep(prev => prev + 1);
        }
      } 
      // Up/Down arrows for agent navigation
      else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        // Prevent default scrolling behavior
        event.preventDefault();
        
        // Only navigate agents if there are agents to navigate
        if (agents.length > 0) {
          // If no agent is selected, select the first one
          if (!selectedAgentId) {
            // Find the first agent with valid logs
            const validAgent = findValidAgent(agents);
            if (validAgent) {
              setSelectedAgentId(validAgent.id);
              // On mobile, switch to agents tab
              if (window.innerWidth < 1024) {
                setActiveTab('agents');
              }
            }
            return;
          }

          // Find the current agent index
          const currentIndex = agents.findIndex(agent => agent.id === selectedAgentId);
          
          if (currentIndex !== -1) {
            let newIndex;
            let newAgent;
            
            if (event.key === 'ArrowUp') {
              // Find previous valid agent
              newAgent = findPreviousValidAgent(agents, currentIndex);
            } else {
              // Find next valid agent
              newAgent = findNextValidAgent(agents, currentIndex);
            }
            
            if (newAgent) {
              setSelectedAgentId(newAgent.id);
              
              // On mobile, switch to agents tab
              if (window.innerWidth < 1024) {
                setActiveTab('agents');
              }
            }
          }
        }
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentTimeStep, maxTimeStep, agents, selectedAgentId]);

  // Helper function to check if an agent has valid logs
  const isValidAgent = (agent: any) => {
    return agent && 
           agent.logs && 
           agent.logs.prompts && 
           agent.logs.prompts.system_prompt && 
           agent.logs.prompts.user_prompt;
  };

  // Helper function to find a valid agent in the array
  const findValidAgent = (agents: any[]) => {
    return agents.find(agent => isValidAgent(agent));
  };

  // Helper function to find the next valid agent
  const findNextValidAgent = (agents: any[], currentIndex: number) => {
    // Try to find a valid agent after the current one
    for (let i = currentIndex + 1; i < agents.length; i++) {
      if (isValidAgent(agents[i])) {
        return agents[i];
      }
    }
    
    // If not found, wrap around to the beginning
    for (let i = 0; i < currentIndex; i++) {
      if (isValidAgent(agents[i])) {
        return agents[i];
      }
    }
    
    // If the current agent is valid, return it
    if (isValidAgent(agents[currentIndex])) {
      return agents[currentIndex];
    }
    
    // If no valid agents found, return null
    return null;
  };

  // Helper function to find the previous valid agent
  const findPreviousValidAgent = (agents: any[], currentIndex: number) => {
    // Try to find a valid agent before the current one
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (isValidAgent(agents[i])) {
        return agents[i];
      }
    }
    
    // If not found, wrap around to the end
    for (let i = agents.length - 1; i > currentIndex; i--) {
      if (isValidAgent(agents[i])) {
        return agents[i];
      }
    }
    
    // If the current agent is valid, return it
    if (isValidAgent(agents[currentIndex])) {
      return agents[currentIndex];
    }
    
    // If no valid agents found, return null
    return null;
  };

  const handleTimeStepChange = (step: number | ((prev: number) => number)) => {
    if (typeof step === 'number') {
      setCurrentTimeStep(step);
    } else {
      setCurrentTimeStep((prev) => step(prev));
    }
  };

  return (
    <main className="p-2 bg-gray-100 min-h-screen">
      {/* Fixed Header with Back Button and Timeline Controls */}
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
            maxTimeStep={maxTimeStep}
            onTimeStepChange={handleTimeStepChange}
          />
          <div className="text-xs text-gray-500 text-center mt-0.5">
            Use ← → keys to navigate steps | ↑ ↓ keys for agents
          </div>
        </div>
      </header>

      {/* Desktop Layout - Centered with max width */}
      <div className="hidden lg:block max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-2">
          {/* Left Column: Grid and Metrics */}
          <div className="col-span-2">
            <SimulationGrid checkpoint={checkpoint} />
            <div className="mt-2">
              <MetricsPanel metrics={metrics} checkpoint={checkpoint} agentHistory={agentHistory} />
            </div>
          </div>
          
          {/* Right Column: Agent Details and Config */}
          <div className="col-span-1">
            <AgentDetailsPanel
              agents={agents}
              selectedAgentId={selectedAgentId}
              onSelectAgent={setSelectedAgentId}
            />
            <div className="mt-2">
              {checkpoint?.data?.configuration && (
                <ConfigPanel config={checkpoint.data.configuration} />
              )}
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

      {/* Loading and Error Messages - Centered */}
      <div className="text-center">
        {isLoading && <p className="mt-2 text-sm">Loading checkpoint data...</p>}
        {error && <p className="mt-2 text-sm text-red-500">Error loading checkpoint data.</p>}
      </div>
    </main>
  );
} 