import type { Request, Response } from "express";
import { items } from "./todostore.js"

export const getAllItems = (req: Request, res: Response) => {
    return res.status(200).json(items);
}
