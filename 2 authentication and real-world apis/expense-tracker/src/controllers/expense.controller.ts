import { Request, Response, NextFunction } from "express";
import * as expenseService from "../services/expense.service";

export async function createExpense(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { amount, category, description, date } = req.body;
        const expense = await expenseService.createExpense({
            amount, 
            category,
            description,
            date,
            userId: req.user!.userId
        });
        res.status(201).json({
            message: "Expense created successfully.",
            expense
        });
    } catch (error) {
        next(error);
    }
}

export async function getUserExpenses(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const expenses = await expenseService.getUserExpenses(
            req.user!.userId,
            req.query
        );
        res.status(200).json({ expenses });
    } catch (error) {
        next(error);
    }
}

export async function getExpense(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const expenseId = Number(req.params.id);
        const expense = await expenseService.getExpenseById(
            expenseId,
            req.user!.userId
        );
        res.status(200).json({ expense });
    } catch (error) {
        next(error);
    }
}

export async function updateExpense(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const expenseId = Number(req.params.id);
        const updated = await expenseService.updateExpense(
            expenseId,
            req.user!.userId,
            req.body
        );
        res.status(200).json({
            message: "Expense updated successfully.",
            expense: updated
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteExpense(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const expenseId = Number(req.params.id);
        const result = await expenseService.deleteExpense(
            expenseId,
            req.user!.userId
        );
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function expenseSummary(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const summary = await expenseService.getExpenseSummary(
            req.user!.userId
        );
        res.status(200).json(summary);
    } catch (error) {
        next(error);
    }
}