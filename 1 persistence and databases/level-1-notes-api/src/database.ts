import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config()

const DB_NAME = process.env.DB_NAME || "notes_db";
const DB_USER = process.env.DB_USER || "aloor";
const DB_PASSWORD = process.env.DB_PASSWORD || "password";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT) || 5432;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    logging: false
});

export const connectDB = async (): Promise<void> => {
    try{
        await sequelize.authenticate();
        console.log("Database connection established.");
    } catch (error){
        console.error("Unable to connect to database: ", error);
        throw error;
    }
};