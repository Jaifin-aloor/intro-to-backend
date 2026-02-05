import type { Request, Response } from "express";
import type { Bookmark } from "./bookmarkstore.js";
import { bookmarks, tagIndex } from './bookmarkstore.js';
import { randomUUID } from "crypto";

export const createBookmark = (req: Request, res: Response) => {
    const { url, name, tags} = req.body;
    if (typeof url !== "string" || typeof name !== "string"){
        return res.json({error: "the url and name has to be strings."});
    }

    const now = Date.now();

    const bookmark: Bookmark = {
        id: randomUUID(),
        url,
        name, 
        tags, 
        createdAt: now,
        updatedAt: now
    }

    bookmarks.push(bookmark);

    for (const tag of bookmark.tags){
        if ( !tagIndex.has(tag)){
            tagIndex.set(tag, new Set());
        }
        tagIndex.get(tag)!.add(bookmark.id);
    }

    return res.status(201).json(bookmark);
}

