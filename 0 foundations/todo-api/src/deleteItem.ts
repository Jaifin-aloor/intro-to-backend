import type { Request, Response } from "express";
import { items } from "./todostore.js"

export const deleteItem = (req: Request, res: Response) => {
    const { id } = req.params;

    const index = items.findIndex( n => n.id === id);
    if (index === -1){
        return res.status(404).json({error: "item not found."});
    }

    const deleted = items.splice(index, 1)[0];

    return res.status(200).json(deleted);
}