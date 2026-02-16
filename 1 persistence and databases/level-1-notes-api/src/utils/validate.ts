import { Request, Response } from "express";


// Validate note creation input
export const validateCreateNote = (req: Request, res: Response): boolean => {
    const { title, content } = req.body;
    if (!title || typeof title !== "string") {
        res.status(400).json({
            message: "Title is required and must be a string."
        });
        return false;
    }
    if (!content || typeof content !== "string") {
        res.status(400).json({
            message: "Content is required and must be a string."
        });
        return false;
    }
    return true;
};

// Validate note update input
export const validateUpdateNote = (req: Request, res: Response): boolean => {
    const {title, content} = req.body;

    if (title !== undefined && typeof title !== "string") {
        res.status(400).json({
            message: "Title must be a string."
        });
        return false
    }
    if (content !== undefined && typeof content !== "string") {
        res.status(400).json({
            message: "Content must be a string."
        });
        return false;
    }
    return true
};