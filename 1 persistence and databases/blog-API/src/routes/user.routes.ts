import { Router, Request, Response } from "express";
import User from '../models/user.model';
import { validateCreateUser } from "../utils/validate";

const router = Router();

// CREATE user
router.post("/", async (req: Request, res: Response) => {
    try {  
        if (!validateCreateUser(req, res)) return;
        const { name, email } = req.body;
        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create user."
        });
    }
});

// GET all users
router.get("/", async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch users."
        });
    }
});

// Get users by id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch user."
        });
    }
});

export default router;