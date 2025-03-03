import React from 'react';
import { ResourceMetrics } from '../../../types/metrics';
import PlantPhaseChart from '../charts/PlantPhaseChart';

interface ResourceStatsPanelProps {
  resourceMetrics: ResourceMetrics;
}

const ResourceStatsPanel: React.FC<ResourceStatsPanelProps> = ({ resourceMetrics }) => {
  if (!resourceMetrics) {
    return null;
  }

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold">Resource Statistics</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <p><strong>Total Resources:</strong> {resourceMetrics.totalResources}</p>
          <p><strong>Total Plants:</strong> {resourceMetrics.totalPlants}</p>
          <p><strong>Average Plants per Node:</strong> {resourceMetrics.averagePlantsPerNode?.toFixed(1) || 'N/A'}</p>
          
          <div className="mt-4">
            <PlantPhaseChart resourceMetrics={resourceMetrics} />
          </div>
        </div>
        
        <div>
          <h5 className="font-semibold">Plant Phase Distribution</h5>
          {resourceMetrics.plantPhaseDistribution && Object.entries(resourceMetrics.plantPhaseDistribution).map(([phase, count]) => (
            <p key={phase}><strong>{phase}:</strong> {count}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceStatsPanel; 