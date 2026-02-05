import type { Express, Request, Response } from "express";
import http from "http";
import express, { urlencoded } from "express";
import cors from "cors";

import { createBookmark } from "./createBookmark.js";
import { readBookMarks } from "./readBookmark.js";
import { readTags } from "./readTags.js";

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
router.get("/tags", readTags);


app.use(router);

http.createServer(app).listen(3000, () => {
    console.log("server is running on port 3000");
});