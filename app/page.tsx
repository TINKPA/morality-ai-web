// app/page.tsx
'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { SimulationRun } from '../components/RunSelector';

export default function HomePage() {
  // Fetch all simulation runs
  const { data: runs, error, isLoading } = useQuery<SimulationRun[], Error>({
    queryKey: ['simulationRuns'],
    queryFn: async () => {
      const response = await fetch('/api/checkpoints');
      if (!response.ok) {
        throw new Error('Failed to fetch simulation runs');
      }
      return response.json();
    },
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-4">
          Simulation Explorer
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Select a simulation run to explore
        </p>
      </header>

      {isLoading && (
        <div className="flex justify-center">
          <p className="text-lg">Loading simulation runs...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>Error loading simulation runs. Please try again later.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {runs?.map((run) => (
          <Link 
            href={`/simulation/${run.runId}`} 
            key={run.id}
            className="block"
          >
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{run.runId}</h2>
              {run.description && (
                <p className="text-gray-700 mb-3">{run.description}</p>
              )}
              <p className="text-sm text-gray-500">
                Created: {formatDate(run.createdAt)}
              </p>
              <div className="mt-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  View Simulation
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {runs?.length === 0 && (
        <div className="text-center p-8">
          <p className="text-lg text-gray-600">No simulation runs available.</p>
        </div>
      )}
    </main>
  );
}
