import type { Request, Response} from 'express';
import { bookmarks, tagIndex } from './bookmarkstore.js';

export const readTags = ( req: Request, res: Response) => {
    return res.json(Array.from(tagIndex.keys()));
}

export const readOneTag = ( req: Request, res: Response) => {
    const { tag } = req.params;

    if (typeof tag !== "string"){
        return res.status(400).json({error: "invalid tag."});
    }

    const ids = tagIndex.get(tag)
    if (!ids){
        return res.status(200).json([]);
    }

    const result = bookmarks.filter(b => ids.has(b.id));
    return res.json(result);
}