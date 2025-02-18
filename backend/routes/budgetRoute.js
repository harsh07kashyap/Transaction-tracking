import express from "express";
import { setBudget,budgetVsActualComparison } from "../controllers/budgetController.js";

const budgetRouter = express.Router();

budgetRouter.post("/setBudget", setBudget);
budgetRouter.get("/budgetVsActualComparison/:month", budgetVsActualComparison);

export default budgetRouter;