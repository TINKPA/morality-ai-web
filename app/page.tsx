// app/page.tsx
'use client'
import React, { useState } from 'react';
import TimelineControls from '../components/TimelineControls';
// ... other imports

export default function Home() {
  const maxTimeStep = 6;
  const [currentTimeStep, setCurrentTimeStep] = useState(0);

  // Handler to update the time step; can be extended to trigger API calls.
  const handleTimeStepChange = (step: number | ((prev: number) => number)) => {
    if (typeof step === 'number') {
      setCurrentTimeStep(step);
    } else {
      setCurrentTimeStep((prev) => step(prev));
    }
    // Here, you could also trigger fetching new checkpoint data.
  };

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Morality-AI-Web</h1>
      {/* Other components like SimulationGrid, Panels, etc. */}
      <TimelineControls
        currentTimeStep={currentTimeStep}
        maxTimeStep={maxTimeStep}
        onTimeStepChange={handleTimeStepChange}
      />
    </main>
  );
}
