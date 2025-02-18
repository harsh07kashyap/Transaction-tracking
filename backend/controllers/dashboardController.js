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


const getPieChartData = async (req, res) => {
  try{
    const result = await Transaction.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const formattedResult = result.map((item) => ({
      category: item._id,
      count: item.count,
    }));
    res.status(200).json(formattedResult);
  }
  catch(error){
    console.error("Error fetching pie chart data:",error)
    res.status(500).json({message:"Server error",error})
  }
}

const categoryPerMonthExpenditure=async(req,res)=>{
  try {
    const result = await Transaction.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
            category: "$category",
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }, // Sort by year and month
      },
    ]);

    if (!Array.isArray(result)) {
      return res.status(500).json({ message: "Unexpected response format", data: result });
    }

    const formattedData = result.map((item) => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`, // YYYY-MM format
      category: item._id.category,
      totalAmount: item.totalAmount,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching category expenses:", error);
    res.status(500).json({ message: "Server Error", error });
  }
}

export { getMonthlyExpenses,getPieChartData,categoryPerMonthExpenditure };
