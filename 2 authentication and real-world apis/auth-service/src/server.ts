import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import sequelize from "./config/database";

const PORT = Number(process.env.PORT) || 3000;

async function start() {
    try {
        await sequelize.authenticate();
        console.log("Database connected.");

        await sequelize.sync();
        console.log("Model synchronised.");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Startup error: ", error);
    }
}

start();
