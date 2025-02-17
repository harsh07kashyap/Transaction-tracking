import Transaction from "../models/Transactions.js";

const getMonthlyExpenses = async (req, res) => {
    try {
        // Aggregate transactions by month, summing the expenses
        const result = await Transaction.aggregate([
          {
            $group: {
              _id: { $month: "$date" }, // Group by the month part of the date
              expenses: { $sum: "$amount" }, // Sum the amounts
            },
          },
          {
            $sort: { _id: 1 }, // Sort by month
          },
        ]);
    
        // Format the result to include the month name and expenses
        const formattedResult = result.map(item => ({
          month: item._id, 
          expenses: item.expenses
        }));
    
        res.status(200).json(formattedResult);
      } catch (error) {
        console.error('Error fetching monthly expenses:', error);
        res.status(500).json({ message: 'Server error', error });
      }
}

export { getMonthlyExpenses };
