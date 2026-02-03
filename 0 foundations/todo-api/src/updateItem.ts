import type { Request, Response } from "express";
import { items } from "./todostore.js"

export const updateItem = (req: Request, res: Response) => {
    const { id } = req.params;
    const { content, state } = req.body;

    if (content != undefined && typeof content != "string"){
        return res.status(400).json({error: "content should be string"});
    }

    if ( state != undefined && typeof state != "boolean" ){
        return res.status(400).json({error: "state should be a boolen"});
    }

    const item = items.find((n) => n.id === id);

    if (!item) {
        return res.status(404).json({error: "item not found."});
    }

    if (content !== undefined) item.content = content;
    if (state !== undefined) item.state = state;
    item.updatedAt = Date.now();

    return res.status(200).json(item);
}