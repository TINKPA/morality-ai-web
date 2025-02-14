// components/RunSelector.tsx
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export interface SimulationRun {
  id: number;
  runId: string;
  description?: string;
  createdAt: string;
}

interface RunSelectorProps {
  selectedRunId: string;
  onSelect: (runId: string) => void;
}

const RunSelector: React.FC<RunSelectorProps> = ({ selectedRunId, onSelect }) => {
  const { data: runs, isLoading, error } = useQuery<SimulationRun[], Error>({
    queryKey: ['simulationRuns'],
    queryFn: async () => {
      const response = await fetch('/api/checkpoints');
      if (!response.ok) {
        throw new Error('Failed to fetch simulation runs');
      }
      return response.json();
    },
  });

  // If no run is selected and runs are available, default to the latest run
  useEffect(() => {
    if (!selectedRunId && runs && runs.length > 0) {
      // Sort runs in descending order by createdAt (newest first)
      const sortedRuns = [...runs].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      onSelect(sortedRuns[0].runId);
    }
  }, [selectedRunId, runs, onSelect]);

  if (isLoading) return <p>Loading runs...</p>;
  if (error) return <p>Error loading runs: {error.message}</p>;

  // Optionally sort the options here too, so the latest run is at the top.
  const sortedRuns = runs
    ? [...runs].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  return (
    <div className="mb-4">
      <label htmlFor="run-selector" className="mr-2 font-semibold">
        Select Run:
      </label>
      <select
        id="run-selector"
        value={selectedRunId}
        onChange={(e) => onSelect(e.target.value)}
        className="border p-1 rounded"
      >
        {sortedRuns.map((run) => (
          <option key={run.id} value={run.runId}>
            {run.runId} {run.description ? `- ${run.description}` : ''}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RunSelector;
