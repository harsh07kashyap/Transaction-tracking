import express from "express";
import { getMonthlyExpenses,getPieChartData,categoryPerMonthExpenditure } from "../controllers/dashboardController.js";


const dashboardRouter = express.Router();

dashboardRouter.get("/monthlyExpenses", getMonthlyExpenses);
dashboardRouter.get("/pieChartData", getPieChartData);
dashboardRouter.get("/categoryPerMonthExpenditure", categoryPerMonthExpenditure);

export default dashboardRouter;