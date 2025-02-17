import React, { useState } from 'react';
import TransactionForm from '../components/TransactionForm';
// import TransactionList from './TransactionList';
// import MonthlyExpensesChart from './MonthlyExpensesChart';

const Transactions = () => {
  // const [transactions, setTransactions] = useState([]);

  // const addTransaction = (transaction) => {
  //   setTransactions([...transactions, transaction]);
  // };

  // const editTransaction = (updatedTransaction) => {
  //   setTransactions(transactions.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
  // };

  // const deleteTransaction = (id) => {
  //   setTransactions(transactions.filter(t => t.id !== id));
  // };

  return (
    <div>
      <h1>Transaction Tracker</h1>
      <TransactionForm />
      {/* <TransactionList /> */}
      {/* <MonthlyExpensesChart transactions={transactions} /> */}
    </div>
  );
};

export default Transactions