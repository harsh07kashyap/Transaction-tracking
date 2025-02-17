import express from "express";
import { getMonthlyExpenses,getPieChartData } from "../controllers/dashboardController.js";


const dashboardRouter = express.Router();

dashboardRouter.get("/monthlyExpenses", getMonthlyExpenses);
dashboardRouter.get("/pieChartData", getPieChartData);

export default dashboardRouter;