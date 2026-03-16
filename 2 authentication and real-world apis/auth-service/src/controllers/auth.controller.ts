import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

export async function signup(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { email, password } = req.body;
        const user = await authService.signup({email, password})

        res.status(201).json({
            message: "User created successfully.",
            user
        });

    } catch (error) {
        next(error)
    }
}

export async function login(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { email, password } = req.body;
        const result = await authService.login({email, password});
        res.status(200).json({
            message: "Login successful.",
            ...result
        });
    } catch (error) {
        next(error)
    }
}