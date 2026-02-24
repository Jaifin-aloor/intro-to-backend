import { NUMBER, Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();

const DB_NAME = process.env.DB_NAME!;
const DB_USER = process.env.DB_USER!;
const DB_PASSWORD = process.env.DB_PASSWORD!;
const DB_HOST = process.env.DB_HOST!;
const DB_PORT = Number(process.env.DB_PORT)!;

export const sequelize: Sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: "postgres",
        logging: console.log
    }
);

export const connectDB = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("Connected to DB Successfully.");
    } catch (error) {
        console.log("Unable to connect to DB: ", error);
        throw error;
    }
};