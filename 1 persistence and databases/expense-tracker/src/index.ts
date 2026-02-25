import dotenv from 'dotenv';
import { Application, Request, Response } from 'express';
import express from "express";
import { connectDB, sequelize } from './database';
import  expenseRoutes  from "./routes/routes";


dotenv.config();

const app: Application = express();
const PORT = process.env.port || 3000;

// Middleware 
app.use(express.json());

// Routes
app.use("/expenses", expenseRoutes);

// Health check
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Expense Tracker is running."
    });
});

// Start server
const startServer = async () => {
    try {
        await connectDB();
        console.log("Database connected successfully.");

        await sequelize.sync();
        console.log("Database synced.");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to database: ", error);
        process.exit(1);
    }
};

startServer();