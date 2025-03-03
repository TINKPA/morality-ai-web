import React from 'react';
import { Pie } from 'react-chartjs-2';
import { pieChartOptions } from './ChartConfig';
import { ResourceMetrics } from '../../../types/metrics';

interface PlantPhaseChartProps {
  resourceMetrics: ResourceMetrics;
}

const PlantPhaseChart: React.FC<PlantPhaseChartProps> = ({ resourceMetrics }) => {
  if (!resourceMetrics.plantPhaseDistribution) {
    return null;
  }

  const plantPhaseData = {
    labels: Object.keys(resourceMetrics.plantPhaseDistribution),
    datasets: [
      {
        label: 'Plant Distribution by Phase',
        data: Object.values(resourceMetrics.plantPhaseDistribution),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(201, 203, 207, 0.6)'
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 205, 86)',
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-48">
      <Pie data={plantPhaseData} options={pieChartOptions} />
    </div>
  );
};

export default PlantPhaseChart; 