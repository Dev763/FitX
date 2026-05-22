import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Mandatory: Register the parts of Chart.js you are using
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceChart = () => {
  const data = {
    labels: ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',],
    datasets: [
      {
        label: 'Minutes Trained',
        data: [45, 60, 0, 90, 45, 120, 0],
        backgroundColor: '#3b82f6',
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className=" p-4 mt-12 ml-22 w-112 h-62 bg-white  rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-4 bg-white dark:text-white">Weekly Activity</h2>
      <Bar data={data} options={options}/>
    </div>
  );
};

export default AttendanceChart;

