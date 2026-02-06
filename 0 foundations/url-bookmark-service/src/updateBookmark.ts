import type { Request, Response } from "express";
import { bookmarks, tagIndex } from "./bookmarkstore.js";
import type { Bookmark } from "./bookmarkstore.js";

export const updateBookmark = ( req: Request, res: Response) => {
    const { id } = req.params;
    const { url, name, tags } = req.body;

    if ( typeof id !== "string"){
        return res.status(400).json({error: "invalid bookmark id."});
    }

    const bookmark = bookmarks.find( b => b.id === id);

    if (!bookmark){
        return res.status(404).json({error: "bookmark not found."});
    }

    const oldTags = bookmark.tags;


    // validate tags if provided
    if (tags !== undefined){
        if ( !Array.isArray(tags) || !tags.every(t => typeof t === "string")){
            return res.status(400).json({error: "tags must be string."});
        }
    }

    // update fields
    if (typeof url === "string") bookmark.url = url;
    if (typeof name === "string") bookmark.name = name;
    if (tags !== undefined) bookmark.tags = tags;
    bookmark.updatedAt = Date.now();


    // tag index diff update
    if ( tags !== undefined){
        const oldSet = new Set(oldTags);
        const newSet = new Set(tags);

        // removed tags
        for (const tag of oldSet){
            if (!newSet.has(tag)){
                const set = tagIndex.get(tag)
                if (set){
                    set.delete(bookmark.id);
                    if (set.size === 0) tagIndex.delete(tag)
                }
            }
        }

        // added tags
        for (const tag of newSet){
            if ( typeof tag === "string"){
                if (!oldSet.has(tag)){
                    if (!tagIndex.has(tag)){
                        tagIndex.set(tag, new Set());
                    }
                    tagIndex.get(tag)!.add(bookmark.id);
                }
            }
        }
    }

    return res.json(bookmark);
}