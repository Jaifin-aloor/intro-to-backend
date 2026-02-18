import { Request, Response } from "express";

// Validate user creation
export const validateCreateUser = (req: Request, res: Response): boolean => {
    const { name, email } = req.body;
    if (!name || typeof name !== "string") {
        res.status(400).json({
            message: "Name is required and must be a string."
        });
        return false;
    }
    if (!email || typeof email !== "string") {
        res.status(400).json({
            message: "Email is required and must be a string."
        });
    }
    return true;
};

// Validate post creation
export const validateCreatePost = (req: Request, res: Response): boolean => {
    const { title, content, userId } = req.body;
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
    }
    if (!userId || typeof userId !== "number") {
        res.status(400).json({
            message: "userId is required and must be a number."
        });
    }
    return true;
};

// Validate post update
export const validateUpdatePost = (req: Request, res: Response): boolean => {
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
    }
    return true;
};


// Validate comment creation
export const validateCreateComment = (req: Request, res: Response): boolean => {
    const { content, postId } = req.body;
    if (!content || typeof content !== "string") {
        res.status(400).json({
            message: "Content is required and must be a string."
        });
        return false;
    }
    if (!postId || typeof postId !== "number") {
        res.status(400).json({
            message: "Postid is required and must be a number."
        });
    }
    return true;
};