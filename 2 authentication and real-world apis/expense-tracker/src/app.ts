import express from "express";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";
import expenseRoutes from "./routes/expense.routes";


const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);

app.use(errorHandler);

export default app;