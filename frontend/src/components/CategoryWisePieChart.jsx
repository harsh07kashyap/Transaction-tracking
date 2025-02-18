import React, { useEffect, useState,useContext} from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import {UserContext} from "../../src/Context/ContextProvider"



const CategoryWisePieChart = () => {
    const [data, setData] = useState([]);
    const backendUrl=useContext(UserContext)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${backendUrl.backendUrl}/api/dashboard/pieChartData`);
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
    <PieChart width={730} height={250}>
      <Pie 
        data={data} 
        dataKey="count" 
        nameKey="category" 
        cx="50%" 
        cy="50%" 
        outerRadius={50} 
        fill="#8884d8" 
      />
    </PieChart>
  </ResponsiveContainer>
  <p className="text-center mt-3 fw-bold">Category Expenses</p>
</div>

  )
}

export default CategoryWisePieChart
