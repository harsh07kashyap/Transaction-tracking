import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlyExpensesChart = () => {
  const [data, setData] = useState([]);

  // Fetching the data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/dashboard/monthlyExpenses");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  const colors = [
    "#FF6347", // January
    "#4682B4", // February
    "#32CD32", // March
    "#FFD700", // April
    "#8A2BE2", // May
    "#FF1493", // June
    "#1E90FF", // July
    "#FF4500", // August
    "#2E8B57", // September
    "#D2691E", // October
    "#A52A2A", // November
    "#00FFFF", // December
  ];

  return (
    <ResponsiveContainer width="50%" height={400}>
      <BarChart margin={{ top: 20, right: 20, left: 20, bottom: 20}}  data={data} >
      <XAxis 
          dataKey="month" 
           // Forces all labels to be shown
        />
        <YAxis />
        <Tooltip />
      
        <Bar dataKey="expenses" fill="#8884d8" barSize={15} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyExpensesChart;
