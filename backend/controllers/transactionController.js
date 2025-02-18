import Transaction from "../models/Transactions.js";

const addTransaction = async (req, res) => {
    try {
        const { amount, date, description, category } = req.body;

        if (!amount || !date || !category) {
          return res.status(400).json({ message: "Amount, Date, and Category are required." });
        }
    
        const newTransaction = new Transaction({ amount, date, description, category });
        await newTransaction.save();
    
        res.status(201).json(newTransaction);
      } catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
}

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.status(200).json(transactions);
      } catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
}


const editTransaction = async (req, res) => {
    try {
        const { editId } = req.params;
        const updatedTransaction = await Transaction.findByIdAndUpdate(editId, req.body, { new: true });
    
        if (!updatedTransaction) {
          return res.status(404).json({ message: "Transaction not found" });
        }
    
        res.status(200).json(updatedTransaction);
      } catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
}


const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
    
        if (!deletedTransaction) {
          return res.status(404).json({ message: "Transaction not found" });
        }
    
        res.status(200).json({ message: "Transaction deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
}

export { addTransaction, getAllTransactions, editTransaction, deleteTransaction };