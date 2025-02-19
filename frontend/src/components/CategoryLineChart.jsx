import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { UserContext } from "../Context/ContextProvider";


const CategoryLineChart = () => {
  const [chartData, setChartData] = useState([]);
    const backendUrl=useContext(UserContext)

    
    useEffect(() => {
      axios.get(`${backendUrl.backendUrl}/api/dashboard/categoryPerMonthExpenditure`)
        .then((response) => {
          console.log("API Response Data:", response.data);
    
          const data = Array.isArray(response.data) ? response.data : Object.values(response.data);
    
          const groupedData = {};
          data.forEach(({ month, category, totalAmount }) => {
            if (!groupedData[month]) {
              groupedData[month] = { month };
            }
            groupedData[month][category] = totalAmount;
          });
    
          setChartData(Object.values(groupedData));
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-4">
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Food" stroke="#8884d8" />
      <Line type="monotone" dataKey="Rent" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Salary" stroke="#ffc658" />
      <Line type="monotone" dataKey="Entertainment" stroke="#ff7300" />
      <Line type="monotone" dataKey="Shopping" stroke="#ff0000" />
      <Line type="monotone" dataKey="Other" stroke="#000000" />
    </LineChart>
  </ResponsiveContainer>
  <p className="text-center mt-4 mb-4 fs-2 fw-bold text-dark-emphasis 
            tracking-tight animate-fade-in">
  <span className="border-bottom border-3 border-primary pb-1">
    Monthly Category Expenses
  </span>
</p>
</div>

  );
};

export default CategoryLineChart;
