
import type { Express, Application, Request, Response } from "express"
import express from "express";
import { log } from "node:console";
import Database from "./config/database.js";
import noteRouter from "./router/noteRouter.js";


class App{
    public app: Application;

    constructor(){
        this.app = express();
        this.plugins();
        this.databaseSync();
        this.routes();
        
    }

    protected plugins(): void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    protected databaseSync(): void{
        const db = new Database();
        db.sequelize?.sync();
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("hello world!");
        });
        this.app.use("/api/v1/note", noteRouter);

    }
}

const port: number = 3000
const app = new App().app; 

app.listen( port, () => {
    console.log("Server running on port 3000.");
    
})  