import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const BarChart = () => {
  const canvasRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Sales Quantity',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgb(127, 23, 45)',
        'rgb(14, 76, 117)',
        'rgb(23, 73, 73)',
      ],
      borderWidth: 2
    }]
  });

  useEffect(() => {
    axios.get('http://localhost:3001/saleschart')
      .then(response => {
        const data = response.data;
        const labels = data.map(item => item.product);
        const salesData = data.map(item => item.quantity);

        setChartData({
          labels: labels,
          datasets: [{
            label: 'Sales Quantity',
            data: salesData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgb(127, 23, 45)',
              'rgb(14, 76, 117)',
              'rgb(23, 73, 73)',
            ],
            borderWidth: 2
          }]
        });
      })
      .catch(error => console.error('Error fetching the data: ', error));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let salesChart;

    if (canvas) {
      salesChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          plugins: {
            legend: {
              display: false,
              labels: {
                font: {
                  size: 16,
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 14,
                },
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 16,
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (salesChart) {
        salesChart.destroy();
      }
    };
  }, [chartData]);

  return (
    <div className="chart-container">
      <canvas ref={canvasRef} id="salesChart"></canvas>
    </div>
  );
};

export default BarChart;
