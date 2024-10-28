import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ menuItems }) => {
  // Define sample data for chart based on menuItems length
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // X-axis labels (e.g., months)
    datasets: [
      {
        label: "Menu Items",
        data: [5, 10, 15, 12, 20, menuItems?.length || 0], // Sample data
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Menu Item Trend",
      },
    },
  };

  return (
    <div className="my-8">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
