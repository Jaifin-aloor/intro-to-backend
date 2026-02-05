import type { Request, Response} from 'express';
import { tagIndex } from './bookmarkstore.js';

export const readTags = ( req: Request, res: Response) => {
    return res.json(Array.from(tagIndex.keys()));
}