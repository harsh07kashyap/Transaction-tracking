
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {UserContext} from "../../src/Context/ContextProvider"


export default function BudgetVsActualChart() {
  const [data, setData] = useState([]);
  const  backendUrl  = useContext(UserContext);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    axios
      .get(`${backendUrl.backendUrl}/api/budget/budgetVsActualComparison/${selectedMonth}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [selectedMonth]);

  return (
    <div className="container bg-white p-4 rounded shadow mt-4">
      <h2 className="text-center mb-4">Budget vs Actual Expenses</h2>

      {/* Month Selector */}
      <div className="mb-3">
        <label className="fw-bold me-2">Select Month:</label>
        <input
          type="month"
          className="form-control d-inline-block w-auto"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      {/* Bar Chart */}
      <div className="w-100" style={{ height: 400 }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} barCategoryGap={0.5} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budgetAmount" fill="#8884d8" barSize={15} name="Budget" />
            <Bar dataKey="actualAmount" fill="#82ca9d" barSize={15} name="Actual Spending" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
