import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes";
import noteRoutes from "./routes/note.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes)

app.use(errorHandler)

export default app;