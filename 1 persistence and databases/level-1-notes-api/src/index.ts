import express from "express";
import type { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./database";
// import noteRoutes from "./routes/note.routes"

dotenv.config();

const app: Application = express();
const PORT = process.env.port || 3000;

// Middleware
app.use(express.json());

// Routes
// app.use("/notes", noteRoutes);

// Health check
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Notes API is running."});
});

const startServer = async () => {
    try{
        await connectDB();
        console.log("Database connected succesfully.");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }catch(error){
        console.error("Falied to connect to database: ", error);
        process.exit(1);
    }
};

startServer();