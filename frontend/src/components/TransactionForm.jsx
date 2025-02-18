import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState,useContext } from "react";
import {UserContext} from "../../src/Context/ContextProvider"



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
  const backendUrl=useContext(UserContext)
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
      console.log(backendUrl.backendUrl)
      const response = await fetch(`${backendUrl.backendUrl}/api/transactionForm/getAllTransactions`);
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
        ? `${backendUrl.backendUrl}/api/transactionForm/editTransaction/${editId}`
        : `${backendUrl.backendUrl}/api/transactionForm/addTransaction`;
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
      await fetch(`${backendUrl.backendUrl}/api/transactionForm/deleteTransaction/${id}`, {
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
    <div className="p-4 border rounded shadow-sm bg-light">
  {/* Form */}
  <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
    <div className="mb-3">
      <input type="number" placeholder="Amount" {...register("amount")} className="form-control" />
      {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
    </div>

    <div className="mb-3">
      <input type="date" {...register("date")} className="form-control" />
      {errors.date && <p className="text-danger">{errors.date.message}</p>}
    </div>

    <div className="mb-3">
      <input type="text" placeholder="Description (optional)" {...register("description")} className="form-control" />
      {errors.description && <p className="text-danger">{errors.description.message}</p>}
    </div>

    <div className="mb-3">
      <select {...register("category")} className="form-select">
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Salary">Salary</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>
      {errors.category && <p className="text-danger">{errors.category.message}</p>}
    </div>

    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
      {loading ? "Saving..." : editId ? "Update Transaction" : "Add Transaction"}
    </button>

    {error && <p className="text-danger mt-2">{error}</p>}
    {success && <p className="text-success mt-2">Transaction saved successfully!</p>}
  </form>

  {/* Transactions List */}
  <h2 className="h5 mt-4">Recent Transactions</h2>
  {transactions.length === 0 ? (
    <p className="text-muted">No transactions added yet.</p>
  ) : (
    <ul className="list-group mt-2">
      {transactions.map((transaction) => (
        <li key={transaction._id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <p className="fw-semibold mb-1">₹ {transaction.amount} - {transaction.category}</p>
            <p className="small text-muted">{transaction.description || "No description"} | {transaction.date}</p>
          </div>
          <div className="d-flex gap-2">
            <button onClick={() => handleEdit(transaction)} className="btn btn-warning btn-sm">Edit</button>
            <button onClick={() => handleDelete(transaction._id)} className="btn btn-danger btn-sm">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>

  );
}
