import type { Request, Response } from "express";
import { bookmarks, tagIndex } from "./bookmarkstore.js";

export const deleteBookmark = ( req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string"){
        return res.status(400).json({error: "invalid id"});
    }

    const index = bookmarks.findIndex( b => b.id === id);
    
    if (index === -1){
        return res.status(404).json({error: "bookmark not found."});
    }

    const [deleted] = bookmarks.splice(index, 1);

    for (const tag of deleted!.tags) {
        const set = tagIndex.get(tag);
        if (!set) continue;

        set.delete(deleted!.id);
        if (set.size === 0){
            tagIndex.delete(tag);
        }
    }

    return res.status(200).json(deleted);

};
