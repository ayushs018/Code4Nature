// TemperatureChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TemperatureChart = ({ avgData, minData, maxData, height, width }) => {
  const labels = avgData.map(data => data.date);

  const data = {
    labels,
    datasets: [
      {
        label: 'Average Temperature',
        data: avgData.map(data => data.value),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Minimum Temperature',
        data: minData.map(data => data.value),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Maximum Temperature',
        data: maxData.map(data => data.value),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  return (
    <div>
      <h2>Temperature Data</h2>
      <Line data={data} height={height} width={width} />
    </div>
  );
};

export default TemperatureChart;
