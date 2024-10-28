import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ menuItems }) => {
  // Calculate the count of items per category
  const categoryCounts = menuItems?.reduce((acc, item) => {
    const category = item.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const totalItems = Object.values(categoryCounts || {}).reduce(
    (sum, count) => sum + count,
    0
  );

  // Extract category names and counts for the chart
  const labels = Object.keys(categoryCounts || {});
  const dataValues = Object.values(categoryCounts || {});

  // Data for Chart.js
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Percentage of Items",
        data: dataValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#bc455b",
        ],
        hoverOffset: 4,
      },
    ],
  };

  // Chart options with percentage labels
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: false, // Disable tooltips to show only the labels
      },
      datalabels: {
        color: "white", // Change label color as needed
        formatter: (value, context) => {
          const percentage = ((value / totalItems) * 100).toFixed(2);
          return `${percentage}%`; // Show percentage
        },
        anchor: "center", // Center the labels
        align: "center", // Align labels in the center
      },
    },
  };

  return (
    <div className="w-72 h-72">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
