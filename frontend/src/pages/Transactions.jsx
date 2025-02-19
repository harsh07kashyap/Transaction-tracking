import React, { useState } from 'react';
import TransactionForm from '../components/TransactionForm';



const Transactions = () => {

  return (
    <div>
      <h1 className="text-center px-sm-5 px-3 py-4 bg-light 
              border-start border-5 border-danger 
              fw-bold fs-2 mb-5">
        Transactions
      </h1>
      <TransactionForm />

    </div>
  );
};

export default Transactions