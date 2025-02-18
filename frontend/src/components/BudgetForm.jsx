import { useState,useContext } from "react";
import axios from "axios";
import { UserContext } from "../Context/ContextProvider";

export default function BudgetForm() {
  const [budgetData, setBudgetData] = useState({ category: "", month: "", budgetAmount: "" });
  const backendUrl=useContext(UserContext)

  const handleChange = (e) => {
    setBudgetData({ ...budgetData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${backendUrl.backendUrl}/api/budget/setBudget`, { ...budgetData });
    alert("Budget Set Successfully");
  };

  return (
    <div className="container mt-4 p-4 border rounded shadow-sm bg-light">
  <h1 className="text-center mb-4">SET BUDGET</h1>
  <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
    {/* Month Input */}
    <div>
      <label className="form-label fw-bold">Select Month</label>
      <input 
        type="month" 
        name="month" 
        value={budgetData.month} 
        onChange={handleChange} 
        required 
        className="form-control"
      />
    </div>

    {/* Category Select */}
    <div>
      <label className="form-label fw-bold">Category</label>
      <select 
        name="category" 
        value={budgetData.category} 
        onChange={handleChange} 
        required 
        className="form-select"
      >
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Salary">Salary</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>
    </div>

    {/* Budget Amount */}
    <div>
      <label className="form-label fw-bold">Budget Amount</label>
      <input 
        type="number" 
        name="budgetAmount" 
        value={budgetData.budgetAmount} 
        onChange={handleChange} 
        required 
        className="form-control"
      />
    </div>

    {/* Submit Button */}
    <button type="submit" className="btn btn-primary w-100">
      Set Budget
    </button>
  </form>
</div>

  );
}
