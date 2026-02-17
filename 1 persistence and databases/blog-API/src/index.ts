import express from "express";
import { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./database";
import User from "./models/user.model";
import Post from "./models/post.model";

dotenv.config();

const testConnection = async () => {
    await connectDB();
    await sequelize.sync();
    console.log("All tables created successfully.");
};

testConnection();