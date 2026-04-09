import { Expense } from "../models";
import { Op } from "sequelize";
import { AppError } from "../utils/appError"

interface CreateExpenseInput {
    amount: number;
    category: string;
    description: string;
    date: Date;
    userId: number;
}

interface UpdateExpenseInput {
    amount?: number;
    category?: string;
    description?: string;
    date?: Date;
}

export async function createExpense(data: CreateExpenseInput) {
    const expense = await Expense.create(data);
    return expense;
}

export async function getUserExpenses(
    userId: number,
    filters: any
) {
    const where: any = { userId }

    // filter by category
    if (filters.category){
        where.category = filters.category;
    }

    // filter by date range
    if (filters.startDate && filters.endDate) {
        where.date = {
            [Op.between]: [new Date(filters.startDate), new Date(filters.endDate)]
        };
    }

    const expenses = await Expense.findAll({
        where, 
        order: [["date", "DESC"]]
    });
    return expenses;
}

export async function getExpenseById(
    expsnseId: number,
    userId: number
) {
    const expense = await Expense.findOne({
        where: {
            id: expsnseId,
            userId
        }
    });

    if (!expense) {
        throw new AppError("Expense not found", 404);
    }
    return expense;
}

export async function updateExpense(
    expenseId: number,
    userId: number,
    data: UpdateExpenseInput
) {
    const expense = await Expense.findOne({
        where: {
            id: expenseId,
            userId
        }
    });
    if (!expense) {
        throw new AppError("Expense not found or unauthorized", 404);
    }
    await expense.update(data);
    return expense;
}

export async function deleteExpense(
    expenseId: number,
    userId: number
) {
    const expense = await Expense.findOne({
        where: {
            id: expenseId,
            userId
        }
    });
    if (!expense) {
        throw new AppError("Expense not found or unauthorized", 404);
    }

    await expense.destroy();
    return { message: "Expense deleted successfully" };
}

export async function getExpenseSummary(userId: number) {
    const expenses = await Expense.findAll({
        where: { userId }
    });
    let total = 0;
    const byCategory: Record<string, number> = {}
    
    for (const exp of expenses) {
        total += exp.amount;

        if (!byCategory[exp.category]) {
            byCategory[exp.category] = 0;
        }

        byCategory[exp.category]! += exp.amount;
    }
    return {
        total, 
        byCategory
    };
}