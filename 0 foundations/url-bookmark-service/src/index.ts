import type { Express, Request, Response } from "express";
import http from "http";
import express, { urlencoded } from "express";
import cors from "cors";

import { createBookmark } from "./createBookmark.js";
import { readOneBookMark, readBookMarks } from "./readBookmark.js";
import { readTags, readOneTag } from "./readTags.js";
import { deleteBookmark } from "./deleteBookmark.js";

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(urlencoded({extended: true}));


app.get("/", (req: Request, res: Response) => {
    return res.send("Hello world from express");
})

const router = express.Router();

router.post("/bookmarks", createBookmark);
router.get("/bookmarks", readBookMarks);
router.get("/bookmarks/:id", readOneBookMark);
router.get("/tags", readTags);
router.get("/tags/:tag", readOneTag);
router.delete("/bookmarks/:id", deleteBookmark);


app.use(router);

http.createServer(app).listen(3000, () => {
    console.log("server is running on port 3000");
});