
import type { Express, Application, Request, Response } from "express"
import express from "express";
import { log } from "node:console";
import Database from "./config/database.js";


class App{
    public app: Application;

    constructor(){
        this.app = express();
        this.databaseSync();
        this.routes();
    }

    protected databaseSync(): void{
        const db = new Database();
        db.sequelize?.sync();
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("hello world!");
        })

    }
}

const port: number = 3000
const app = new App().app; 

app.listen( port, () => {
    console.log("Server running on port 3000.");
    
})  