import React from 'react';
import { Bar } from 'react-chartjs-2';
import { chartOptions } from './ChartConfig';
import { Metrics } from '../../../types/metrics';

interface AgentDistributionChartProps {
  metrics: Metrics;
}

const AgentDistributionChart: React.FC<AgentDistributionChartProps> = ({ metrics }) => {
  const agentDistributionData = {
    labels: ['Moral Agents', 'Immoral Agents'],
    datasets: [
      {
        label: 'Number of Agents',
        data: [metrics.moralAgents, metrics.nonMoralAgents],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-48">
      <Bar data={agentDistributionData} options={chartOptions} />
    </div>
  );
};

export default AgentDistributionChart; 