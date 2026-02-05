import type { Request, Response} from 'express';
import { bookmarks } from './bookmarkstore.js';

export const readBookMarks = ( req: Request, res: Response ) => {
    return res.json(bookmarks)
}

export const readOneBookMark = ( req: Request, res: Response ) => {
    const { id } = req.params;
    const bookmark = bookmarks.find((b) => b.id == id);

    if (!bookmark) {
        return res.status(404).json({error: "bookmark not found."});
    }

    return res.status(200).json(bookmark);
}