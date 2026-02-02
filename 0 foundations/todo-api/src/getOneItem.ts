import type { Request, Response } from "express";
import { items } from "./todostore.js"

export const getOneItem = (req: Request, res: Response) => {
    const { id } = req.params;
    
    const item = items.find( (n) => n.id === id);

    if (!item){
        return res.status(404).json({error: "item not found."});
    }

    return res.status(200).json(item);
}