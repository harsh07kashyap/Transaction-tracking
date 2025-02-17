import React from 'react'
import MonthlyExpensesChart from '../components/MonthlyExpensesChart';
import CategoryWisePieChart from '../components/CategoryWisePieChart';



const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <MonthlyExpensesChart />
      <CategoryWisePieChart/>
    </div>
  )
}

export default Dashboard
