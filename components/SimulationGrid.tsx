import React, { JSX } from 'react';

interface SimulationGridProps {
  // In a real-world scenario, you'd define a proper type for your checkpoint data.
  checkpoint?: any;
}

const SimulationGrid: React.FC<SimulationGridProps> = ({ checkpoint }) => {
  // Helper function to render each cell in the grid.
  const renderCell = (x: number, y: number) => {
    // Extract arrays for resources and agents.
    const resources = checkpoint?.physical_environment?.resources || [];
    const agents = checkpoint?.social_environment?.agents || [];

    // Find a resource that is located at cell (x, y).
    const resourceAtCell = resources.find(
      (res: any) => res.location.x === x && res.location.y === y
    );

    // Find all agents located at cell (x, y).
    const agentsAtCell = agents.filter(
      (agent: any) => agent.state.location.x === x && agent.state.location.y === y
    );

    return (
      <div
        key={`cell-${x}-${y}`}
        className="border border-gray-300 flex items-center justify-center relative h-16 w-16"
      >
        <span className="text-xs text-gray-500 absolute top-1 left-1">{`${x},${y}`}</span>
        {resourceAtCell && (
          <div className="bg-green-300 text-xs p-1 rounded">
            {/* Display resource type and quantity (if available) */}
            {resourceAtCell.type
              ? `${resourceAtCell.type}:${resourceAtCell.quantity}`
              : `P${resourceAtCell.quantity}`}
          </div>
        )}
        {agentsAtCell.length > 0 && (
          <div className="absolute bottom-1 right-1 flex flex-wrap">
            {agentsAtCell.map((agent: any) => (
              <div 
                key={agent.id} 
                className={`text-xs p-1 rounded mr-0.5 ${agent.type === 'moral' ? 'bg-blue-300' : 'bg-red-300'}`}
              >
                {/* Display a short identifier from the agent's id */}
                {agent.id}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Build the grid (16 rows x 16 columns)
  const gridRows = [];
  for (let y = 0; y < 16; y++) {
    const rowCells: JSX.Element[] = [];
    for (let x = 0; x < 16; x++) {
      rowCells.push(renderCell(x, y));
    }
    gridRows.push(
      <div key={`row-${y}`} className="flex">
        {rowCells}
      </div>
    );
  }

  // Get observations from the checkpoint data
  const observations = checkpoint?.data?.observations || [];

  return (
    <div className="grid-container p-4">
      <h2 className="text-xl font-bold mb-4">Simulation Grid (16x16)</h2>
      <div className="flex flex-col">{gridRows}</div>
      
      {/* Display observations */}
      {observations.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Observations</h3>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 max-h-40 overflow-y-auto">
            <ul className="list-disc pl-5 space-y-1">
              {observations.map((observation: string, index: number) => (
                <li key={index} className="text-sm text-gray-700">{observation}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationGrid;
