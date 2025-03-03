import React from 'react';
import { Line } from 'react-chartjs-2';
import { lineChartOptions } from './ChartConfig';
import { AgentHistoryPoint } from '../../../types/metrics';

interface AgentEvolutionChartProps {
  agentHistory: AgentHistoryPoint[];
}

const AgentEvolutionChart: React.FC<AgentEvolutionChartProps> = ({ agentHistory }) => {
  if (!agentHistory || agentHistory.length === 0) {
    return null;
  }

  const agentEvolutionData = {
    labels: agentHistory.map((point) => `Step ${point.timeStep}`),
    datasets: [
      {
        label: 'Moral Agents',
        data: agentHistory.map((point) => point.moralAgents),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
      {
        label: 'Immoral Agents',
        data: agentHistory.map((point) => point.nonMoralAgents),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="h-64">
      <Line data={agentEvolutionData} options={lineChartOptions} />
    </div>
  );
};

export default AgentEvolutionChart; 