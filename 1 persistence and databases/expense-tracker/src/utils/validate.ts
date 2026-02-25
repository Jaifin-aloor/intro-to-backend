import { Request, Response } from "express";

export const errorMessage = (res: Response, m: string): void => {
    res.status(400).json({
        message: m
    });
} 

export const validateCreateExpense = (req: Request, res: Response): boolean => {
    const { amount, category, description, date } = req.body;
    if ( amount === undefined || typeof amount !== "number") {
        errorMessage(res, "Amount should be a number.");
        return false;
    }
    if ( !category || typeof category !== "string") {
        errorMessage(res, "Category should be a string.");
        return false;
    }
    if ( !description || typeof description !== "string") {
        errorMessage(res, "Description should be a string.");
        return false;
    }
    if ( !date || typeof date !== "string" || isNaN(Date.parse(date))) {
        errorMessage(res, "Date should be a string.");
        return false;
    }
    return true;
}

export const validateUpdateExpense = (req: Request, res: Response): boolean => {
    const { amount, category, description, date } = req.body;
    if ( amount !== undefined && typeof amount !== "number") {
        errorMessage(res, "Amount should be a number.");
        return false;
    }
    if ( category !== undefined && typeof category !== "string") {
        errorMessage(res, "Category should be a string.");
        return false;
    }
    if ( description !== undefined && typeof description !== "string") {
        errorMessage(res, "Description should be a string.");
        return false;
    }
    if ( date !== undefined && typeof date !== "string" || isNaN(Date.parse(date))) {
        errorMessage(res, "Date should be a string.");
        return false;
    }
    if ( amount === undefined && category === undefined && description === undefined && date === undefined) {
        errorMessage(res, "At least one field should be provided to update.");
        return false;
    }
    return true;
}