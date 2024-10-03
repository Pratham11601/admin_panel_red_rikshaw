import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from "framer-motion";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = () => {
  // Data for the bar chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
    datasets: [
      {
        label: 'Completed Rides',
        data: [120, 150, 180, 90, 200, 170, 220, 140, 250],
        backgroundColor: 'rgba(34, 197, 94, 0.7)', // Greenish color
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Ongoing Rides',
        data: [80, 100, 140, 70, 160, 130, 190, 110, 220],
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // Blue color
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Canceled Rides',
        data: [20, 30, 40, 15, 50, 35, 60, 25, 70],
        backgroundColor: 'rgba(239, 68, 68, 0.7)', // Red color
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Rides Overview (Monthly)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <motion.div
            className='bg-white bg-opacity-20 backdrop-blur-md shadow-xl rounded-xl p-6 border-l border-red-400'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
        <div className='h-80 w-full'> 
        <Bar data={data} options={options}  />
        </div>
        
      
        </motion.div>
  );
};

export default BarGraph;
