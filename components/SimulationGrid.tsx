import React, { JSX } from 'react';

interface SimulationGridProps {
  // For now, we expect an optional checkpoint data.
  // In a real-world scenario, you'd define a type for your checkpoint data.
  checkpoint?: any;
}

const SimulationGrid: React.FC<SimulationGridProps> = ({ checkpoint }) => {
  // Optional: Extract resources and agents from the checkpoint data.
  // For example:
  // const resources = checkpoint?.physical_environment?.resources || [];
  // const agents = checkpoint?.social_environment?.agents || [];

  // Helper functions can be added later to locate resources/agents in the grid.
  const renderCell = (x: number, y: number) => {
    // Placeholder for resource or agent overlay logic:
    const resource = false; // Replace with actual logic: find resource at (x,y)
    const agents = false; // Replace with actual logic: find agents at (x,y)

    return (
      <div
        key={`cell-${x}-${y}`}
        className="border border-gray-300 flex items-center justify-center relative h-16 w-16"
      >
        <span className="text-xs text-gray-500 absolute top-1 left-1">{`${x},${y}`}</span>
        {resource && (
          <div className="bg-green-300 text-xs p-1 rounded">
            {/* Render resource details */}
            Res
          </div>
        )}
        {agents && (
          <div className="absolute bottom-1 right-1 bg-blue-300 text-xs p-1 rounded">
            {/* Render agent initials or icon */}
            A
          </div>
        )}
      </div>
    );
  };

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

  return (
    <div className="grid-container p-4">
      <h2 className="text-xl font-bold mb-4">Simulation Grid (16x16)</h2>
      <div className="flex flex-col">{gridRows}</div>
    </div>
  );
};

export default SimulationGrid;
