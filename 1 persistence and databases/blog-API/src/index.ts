import express from "express";
import { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./database";

import "./models/user.model";
import "./models/post.model";
import "./models/comment.model";

import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import commentRoutes from "./routes/comment.routes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

// Health check
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Blog API is running."
    });
});

// Start server
const startServer = async (): Promise<void> => {
    try {
        // Connect to DB
        await connectDB();
        // Sync all models
        await sequelize.sync();
        console.log("Database connected successfully.");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    } catch (error) {
        console.error("Failed to start server: ", error);
        process.exit(1);
    }
};

startServer();