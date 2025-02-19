import React, { useEffect, useState,useContext} from 'react';
import { PieChart, Pie, ResponsiveContainer,Cell } from 'recharts';
import {UserContext} from "../../src/Context/ContextProvider"



const CategoryWisePieChart = () => {
    const [data, setData] = useState([]);
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57', '#ffc0cb'];

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
        outerRadius={100} 
        fill="#8884d8" 
        label={({
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          value,
          index
        }) => {
          const RADIAN = Math.PI / 180;
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <text
              x={x}
              y={y}
              fill={colors[index % colors.length]}
              textAnchor={x > cx ? 'start' : 'end'}
              dominantBaseline="central"
            >
              {data[index].category} ({value})
            </text>
          );
        }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
  <p className="text-center mt-4 mb-4 fs-2 fw-bold text-dark-emphasis 
            tracking-tight animate-fade-in">
  <span className="border-bottom border-3 border-primary pb-1">
    Category-Wise Expenses
  </span>
</p>
</div>

  )
}

export default CategoryWisePieChart
