import React, { useEffect, useState,useContext} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {UserContext} from "../../src/Context/ContextProvider"





const MonthlyExpensesChart = () => {
  const [data, setData] = useState([]);
  const backendUrl=useContext(UserContext)
  
  
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
  <p className="text-center mt-4 mb-4 fs-2 fw-bold text-dark-emphasis 
            tracking-tight animate-fade-in">
  <span className="border-bottom border-3 border-primary pb-1">
    Monthly Expenses
  </span>
</p>
</div>
  );
};

export default MonthlyExpensesChart;
