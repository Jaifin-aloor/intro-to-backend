import { Router, Request, Response } from "express";
import Expense from '../models/models';
import { validateCreateExpense, validateUpdateExpense } from "../utils/validate";

const router = Router();

const serverErrorHandler = (res: Response, e: any, m: string): void => {
    console.error(e);
    res.status(500).json({
        message: m
    });
}

const notFoundErrorHandler = (res: Response): Response => {
    return res.status(404).json({
        message: "Expense not found."
    });
}

// Create an expense
router.post("/", async (req: Request, res: Response) => {
    try {
        if (!validateCreateExpense(req, res)) return;
        const { amount, category, description, date } = req.body;
        const expense = await Expense.create({ amount, category, description, date: new Date(date) });
        res.status(201).json(expense)
    } catch (error) {
        serverErrorHandler(res, error, "Failed to create expense.");
    }
});

// GET all expenses
router.get("/", async (req: Request, res: Response) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json(expenses);
    } catch (error) {
        serverErrorHandler(res, error, "Failed to fetch expenses.");
    }
});

// GET expense by id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const expense = await Expense.findByPk(id);
        if (!expense) notFoundErrorHandler(res);
        res.status(200).json(expense);
    } catch (error) {
        serverErrorHandler(res, error, "Failed to fetch expense.");
    }
});

// UPDATE expense
router.put("/:id", async (req: Request, res: Response) => {
    try {
        if (!validateUpdateExpense(req, res)) return;
        const id = Number(req.params.id);
        const { amount, category, description, date } = req.body;
        const expense = await Expense.findByPk(id);
        if (!expense) return notFoundErrorHandler(res); 
        expense.amount = amount ?? expense.amount;
        expense.category = category ?? expense.category;
        expense.description = description ?? expense.description;
        if ( date !== undefined ) {
            expense.date = new Date(date);
        }
        await expense.save();
        res.status(200).json(expense);
    } catch (error) {
        serverErrorHandler(res, error, "Failed to update expense.");
    }
});

// DELETE expense
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const expense = await Expense.findByPk(id);
        if (!expense) return notFoundErrorHandler(res);
        await expense?.destroy();
        res.status(200).json({
            message: "Expense deleted successfully."
        })
    } catch (error) {
        serverErrorHandler(res, error, "Failed to delete expense.");
    }
});

export default router;