import express from "express"
import { addTransaction, getAllTransactions, editTransaction, deleteTransaction } from "../controllers/transactionController.js"

const transactionRouter=express.Router()


//admin can add doctors/nurses
transactionRouter.post('/addTransaction',addTransaction)

//api to get dashboard-data
transactionRouter.get("/getAllTransactions",getAllTransactions)

//api to get list all appointments
transactionRouter.put('/editTransaction/:editId',editTransaction)

//api to delete appointment
transactionRouter.delete('/deleteTransaction/:id',deleteTransaction)

export default transactionRouter