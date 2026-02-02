import http from "http";
import express, { urlencoded } from "express";
import type {Express, Request, Response} from 'express';
import cors from "cors";
import { createItem } from "./createItem.js";
import { getOneItem } from "./getOneItem.js";
import { getAllItems } from "./getAllItems.js";
import { updateItem } from "./updateItem.js";
import { deleteItem } from "./deleteItem.js";

const app: Express = express();

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cors());

app.get("/", (req: Request, res: Response) => 
{
    res.send("hello world from express");
});


// Routes

const router = express.Router();

router.post("/items", createItem);
router.get("/items", getAllItems);
router.get("/items/:id", getOneItem);
router.put("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

app.use(router);
http.createServer(app).listen(3000, () => {
    console.log("server is running on port 3000")
});
