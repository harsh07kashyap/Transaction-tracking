import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  category: {
    type: String,
    required: true,
    enum: ["Food", "Rent", "Salary", "Entertainment", "Shopping", "Other"],
  },
});


const Transaction= mongoose.models.transactions|| mongoose.model("Transactions", transactionSchema);

export default Transaction;