import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export function errorHandler(
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);

    // known (custom) errors
    if ( err instanceof AppError ) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    // unknown errors 
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}