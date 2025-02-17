import express from "express";
import { getMonthlyExpenses } from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/monthlyExpenses", getMonthlyExpenses);

export default dashboardRouter;