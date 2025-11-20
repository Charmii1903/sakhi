import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  Filler,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { backendUrl} from '../App.jsx'


Chart.register(Filler, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const Dashboard = ({token}) => {
  const [salesData, setSalesData] = useState([]);
  const [chartData, setChartData] = useState(null);


  useEffect(() => {
    if (!token) {
      return null;
    }

    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/order/sales`, { headers: { token } });
        if (response.data.success) {
          setSalesData(response.data.data);
        } else {
          console.error('API responded with an error:', response.data.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching sales data:', error.message);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
      }
      
    };

    fetchSalesData();
  }, []);

 
  const getMonthName = (monthNumber) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return monthNames[monthNumber - 1];
  };


  useEffect(() => {
    if (salesData.length > 0) {
      const labels = salesData.map((item) => {
        const [month, year] = item.month.split('-'); 
        return `${getMonthName(Number(month))} ${year}`; 
      });
      
      const data = salesData.map((item) => item.totalSales);
  
      setChartData({
        labels,
        datasets: [
          {
            label: 'Monthly Sales',
            data,
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: 'rgba(0, 123, 255, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0, 123, 255, 1)',
            tension: 0.4,
          },
        ],
      });
    }
  }, [salesData]);
  

  return (
    <div
      style={{
        width: '90%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          color: '#333',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        Sales Dashboard
      </h2>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '400px', // Constrain chart height
          marginBottom: '20px',
        }}
      >
        {chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: 'Sales Performance (Monthly)',
                  font: {
                    size: 18,
                    family: "'Poppins', sans-serif",
                    weight: 'bold',
                  },
                  color: '#333',
                },
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    font: {
                      size: 12,
                    },
                    color: '#555',
                  },
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `₹${context.raw.toLocaleString()}`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    font: {
                      size: 12,
                    },
                    color: '#555',
                  },
                },
                y: {
                  grid: {
                    color: '#e9ecef',
                  },
                  ticks: {
                    font: {
                      size: 12,
                    },
                    color: '#555',
                    callback: function (value) {
                      return `₹${value.toLocaleString()}`;
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <p
            style={{
              textAlign: 'center',
              color: '#888',
              marginTop: '20px',
              fontSize: '16px',
            }}
          >
            Loading sales data...
          </p>
        )}
        </div>
      </div>
    );
  };
  
  export default Dashboard;
     
