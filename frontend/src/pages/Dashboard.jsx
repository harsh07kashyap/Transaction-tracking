import React from 'react'
import MonthlyExpensesChart from '../components/MonthlyExpensesChart';
import CategoryWisePieChart from '../components/CategoryWisePieChart';
import CategoryLineChart from '../components/CategoryLineChart';



const Dashboard = () => {
  return (
    <div>
      <h1>DASHBOARD</h1>
      <MonthlyExpensesChart />
      <CategoryWisePieChart/>
      <CategoryLineChart/>
    </div>
  )
}

export default Dashboard
