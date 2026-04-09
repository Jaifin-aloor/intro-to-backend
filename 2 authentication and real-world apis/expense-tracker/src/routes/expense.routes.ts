import { Router } from "express";
import {
    createExpense,
    getUserExpenses,
    getExpense,
    updateExpense,
    deleteExpense,
    expenseSummary
} from "../controllers/expense.controller";
import { authenticate} from "../middlewares/auth.middleware";

const router = Router();

// protect all user Routes 
router.use(authenticate);

router.post("/", createExpense);
router.get("/", getUserExpenses);
router.get("/summary", expenseSummary);
router.get("/:id", getExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;