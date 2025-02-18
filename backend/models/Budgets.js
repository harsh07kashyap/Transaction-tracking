import mongoose from "mongoose"

const BudgetSchema = new mongoose.Schema({
  month: { type: String, required: true },
  category: { type: String, required: true },
  budgetAmount: { type: Number, required: true }
});


const Budget = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
export default Budget;