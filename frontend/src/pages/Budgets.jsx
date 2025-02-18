import React from 'react'
import BudgetForm from '../components/BudgetForm'
import BudgetVsActualChart from '../components/BudgetVsActualComparison'


const Budgets = () => {
  return (
    <div>
      <BudgetForm/>
      <BudgetVsActualChart/>
    </div>
  )
}

export default Budgets
