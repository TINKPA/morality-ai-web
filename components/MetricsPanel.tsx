// components/MetricsPanel.tsx
import React from 'react';
import { Metrics, MetricsPanelProps } from '../types/metrics';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics }) => {
  if (!metrics) {
    return (
      <div className="p-4 border rounded shadow bg-white">
        <h3 className="text-xl font-bold mb-2">Simulation Metrics</h3>
        <p>No metrics available.</p>
      </div>
    );
  }

  // Prepare data for the agent distribution chart
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

  // Prepare data for the HP statistics chart
  const hpStatsData = {
    labels: ['Min HP', 'Average HP', 'Max HP'],
    datasets: [
      {
        label: 'Health Points',
        data: [metrics.minHP, Math.round(metrics.averageHP), metrics.maxHP],
        backgroundColor: [
          'rgba(255, 159, 64, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgb(255, 159, 64)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="text-xl font-bold mb-2">Simulation Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-lg font-semibold">Agent Statistics</h4>
          <p><strong>Total Agents:</strong> {metrics.totalAgents}</p>
          <p><strong>Moral Agents:</strong> {metrics.moralAgents}</p>
          <p><strong>Immoral Agents:</strong> {metrics.nonMoralAgents}</p>
          
          <div className="h-48 mt-4">
            <Bar data={agentDistributionData} options={chartOptions} />
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold">Health Points</h4>
          <p><strong>Average HP:</strong> {metrics?.averageHP?.toFixed(0) || 'N/A'}</p>
          <p><strong>Max HP:</strong> {metrics?.maxHP || 'N/A'}</p>
          <p><strong>Min HP:</strong> {metrics?.minHP || 'N/A'}</p>
          
          <div className="h-48 mt-4">
            <Bar data={hpStatsData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;
