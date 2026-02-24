import { Request, Response } from "express";
import { DATE } from "sequelize";

export const validateCreateExpense = (req: Request, res: Response): boolean => {
    const { amount, category, description, date } = req.body;
    if ( amount == undefined || typeof amount !== "number") {
        res.status(400).json({
            message: "Amount should be a number."
        });
        return false;
    }
    if ( !category || typeof category !== "string") {
        res.status(400).json({
            message: "Category should be a string."
        });
        return false;
    }
    if ( !description || typeof description !== "string") {
        res.status(400).json({
            message: "Description should be a string."
        });
        return false;
    }
    if ( !date || typeof date !== "string" || isNaN(Date.parse(date))) {
        res.status(400).json({
            message: "Date should be a string."
        });
        return false;
    }
    return true;
}

export const validateUpdateExpense = (req: Request, res: Response): boolean => {
    const { amount, category, description, date } = req.body;
    if ( amount !== undefined && typeof amount !== "number") {
        res.status(400).json({
            message: "Amount should be a number."
        });
        return false;
    }
    if ( category !== undefined && typeof category !== "string") {
        res.status(400).json({
            message: "Category should be a string."
        });
        return false;
    }
    if ( description !== undefined && typeof description !== "string") {
        res.status(400).json({
            message: "Description should be a string."
        });
        return false;
    }
    if ( date !== undefined && typeof date !== "string" || isNaN(Date.parse(date))) {
        res.status(400).json({
            message: "Date should be a string."
        });
        return false;
    }
    if ( amount === undefined && category === undefined && description === undefined && date === undefined) {
        res.status(400).json({
            message: "At least one field should be provided for update."
        })
        return false;
    }
    return true;
}