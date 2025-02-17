import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";

const transactionSchema = z.object({
  amount: z.preprocess(
    (val) => Number(val),
    z.number().positive("Amount must be greater than 0")
  ),
  date: z.string().nonempty("Date is required"),
  description: z.string().max(200, "Description is too long").optional(),
  category: z.enum(["Food", "Rent", "Salary", "Entertainment", "Shopping", "Other"]),
});

export default function TransactionForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset, 
    setValue 
  } = useForm({
    resolver: zodResolver(transactionSchema),
  });

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/transactionForm/getAllTransactions");
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle form submission (Add or Edit)
  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const url = editId
        ? `http://localhost:4000/api/transactionForm/editTransaction/${editId}`
        : "http://localhost:4000/api/transactionForm/addTransaction";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to save transaction");

      setSuccess(true);
      reset();
      setEditId(null);
      fetchTransactions(); // Refresh list
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;

    try {
      await fetch(`http://localhost:4000/api/transactionForm/deleteTransaction/${id}`, {
        method: "DELETE",
      });
      fetchTransactions(); // Refresh list
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  // Handle Edit
  const handleEdit = (transaction) => {
    setEditId(transaction._id);
    setValue("amount", transaction.amount);
    setValue("date", transaction.date);
    setValue("description", transaction.description);
    setValue("category", transaction.category);
  };

  return (
    <div className="p-4 border rounded">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input type="number" placeholder="Amount" {...register("amount")} className="border p-2 w-full" />
        {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}

        <input type="date" {...register("date")} className="border p-2 w-full" />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}

        <input type="text" placeholder="Description (optional)" {...register("description")} className="border p-2 w-full" />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}

        <select {...register("category")} className="border p-2 w-full">
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}

        <button type="submit" className="bg-blue-500 text-black p-2 rounded w-full" disabled={loading}>
          {loading ? "Saving..." : editId ? "Update Transaction" : "Add Transaction"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">Transaction saved successfully!</p>}
      </form>

      {/* Transactions List */}
      <h2 className="text-xl font-semibold mt-6">Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions added yet.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {transactions.map((transaction) => (
            <li key={transaction._id} className="p-2 border rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">${transaction.amount} - {transaction.category}</p>
                <p className="text-sm">{transaction.description || "No description"} | {transaction.date}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleEdit(transaction)} className="bg-yellow-500 text-black p-1 rounded">Edit</button>
                <button onClick={() => handleDelete(transaction._id)} className="bg-red-500 text-black p-1 rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
