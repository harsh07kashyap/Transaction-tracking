import Budget from "../models/Budgets.js";
import Transaction from "../models/Transactions.js";

const setBudget = async (req, res) => {
    try {
        const { month, category, budgetAmount } = req.body;
    
        const existingBudget = await Budget.findOne({ month, category });
    
        if (existingBudget) {
          existingBudget.budgetAmount = budgetAmount;
          await existingBudget.save();
          return res.json({ message: "Budget updated", budget: existingBudget });
        }
    
        const newBudget = await Budget.create({ month, category, budgetAmount });
        res.status(201).json({ message: "Budget set successfully", budget: newBudget });
      } catch (error) {
        res.status(500).json({ message: "Error setting budget", error });
      }
};


const budgetVsActualComparison=async(req,res)=>{
    try {
        const { month } = req.params;
        // console.log("Fetching budget vs actual data for month:", month);

        // Ensure month is in the correct format
        if (!month || typeof month !== "string") {
            return res.status(400).json({ message: "Invalid month format" });
        }
    
        // Fetch budget data
        const budgetData = await Budget.find({ month });
        // console.log("Budget Data:", budgetData);

        // Convert the month to a Date object for comparison
        const [year, monthNumber] = month.split('-');
        const startDate = new Date(`${year}-${monthNumber}-01T00:00:00Z`);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);  // Set to the next month
    
        // Fetch actual spending from transactions
        const transactions = await Transaction.aggregate([
          { $match: {
            date: {
              $gte: startDate,
              $lt: endDate, // Transactions that fall in the given month
            },
          }, },
          {
            $group: {
              _id: "$category",
              actualAmount: { $sum: "$amount" },
            },
          },
        ]);

        // console.log(transactions)

        if (!budgetData.length && !transactions.length) {
            return res.status(404).json({ message: "No budget or transaction data found" });
          }
    
        // Convert transaction data into an object for quick lookup
        const actualSpendingMap = {};
        transactions.forEach((txn) => {
          actualSpendingMap[txn._id] = txn.actualAmount;
        });
    
        // Merge budget and actual spending data
        const responseData = budgetData.map((budget) => ({
          category: budget.category,
          budgetAmount: budget.budgetAmount,
          actualAmount: actualSpendingMap[budget.category], // Default to 0 if no transactions found
        }));
    
        // console.log("ResponseData:", responseData);
        res.json(responseData);
      } catch (error) {
        console.error("Error fetching budget vs actual data:", error);
        res.status(500).json({ message: "Server Error", error });
      }
}

export {setBudget,budgetVsActualComparison};