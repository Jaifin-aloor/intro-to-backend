import { Router } from "express";
import {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote
} from "../controllers/note.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router()

// All routes are protected
router.use(authenticate);

router.post("/", createNote);
router.get("/", getNotes);
router.get("/:id", getNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;