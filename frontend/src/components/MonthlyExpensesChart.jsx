import React, { useEffect, useState,useContext} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {UserContext} from "../../src/Context/ContextProvider"



const MonthlyExpensesChart = () => {
  const [data, setData] = useState([]);
  const backendUrl=useContext(UserContext)
  
  
  // Fetching the data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl.backendUrl}/api/dashboard/monthlyExpenses`);
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
    <div className="d-flex flex-column justify-content-center align-items-center my-4">
  <ResponsiveContainer width="50%" height={400}>
    <BarChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }} data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="expenses" fill="#8884d8" barSize={15} />
    </BarChart>
  </ResponsiveContainer>
  <p className="text-center mt-3 fw-bold">Monthly Expenses</p>
</div>
  );
};

export default MonthlyExpensesChart;
