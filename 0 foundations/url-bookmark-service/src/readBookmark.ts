import type { Request, Response} from 'express';
import { bookmarks } from './bookmarkstore.js';

export const readBookMarks = ( req: Request, res: Response) => {
    return res.json(bookmarks)
}