import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import sequelize from "./config/database";

import "./models/user.model";
import "./models/expense.model";

const PORT = Number(process.env.PORT)!;

async function start() {
    try {
        await sequelize.authenticate();
        console.log("Database connected.");

        await sequelize.sync();
        console.log("Models synchronized.");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Startup error: ", error);
    }
}

start();