import React from 'react';
import { Bar } from 'react-chartjs-2';
import { chartOptions } from './ChartConfig';
import { Metrics } from '../../../types/metrics';

interface HPStatsChartProps {
  metrics: Metrics;
}

const HPStatsChart: React.FC<HPStatsChartProps> = ({ metrics }) => {
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

  return (
    <div className="h-48">
      <Bar data={hpStatsData} options={chartOptions} />
    </div>
  );
};

export default HPStatsChart; 