import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import type { Item } from "./todostore.js"
import { items } from "./todostore.js";

export const createItem = (req: Request, res: Response) => {
    const { content } = req.body;
    if (typeof content != "string"){
        return res.status(400).json({error: "content should be a string."})
    }

    const now = Date.now();

    const item: Item = {
        id: randomUUID(),
        content,
        state: false,
        createdAt: now,
        updatedAt: now
    };

    items.push(item);

    return res.status(200).json(item);
}

