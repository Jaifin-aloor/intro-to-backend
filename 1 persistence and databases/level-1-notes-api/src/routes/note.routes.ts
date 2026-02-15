import { Router, Request, Response } from "express";
import Note from "../models/note.model";

const router = Router();

// CREATE a note
router.post("/", async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                message: "title and content are required."
            });
        }
        const note = await Note.create({ title, content });
        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create note."
        });
    }
});

// GET all notes
router.get("/", async ( req: Request, res: Response) => {
    try {
        const notes = await Note.findAll();
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch notes."
        });
    }
});

// GET notes by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).json({
                message: "Note not found."
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch note."
        });
    }
});

// UPDATE note
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { title, content } = req.body;
        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).json({
                message: "Note not found."
            });
        }
        note.title = title ?? note.title;
        note.content = content ?? note.content;
        await note.save();
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update note."
        });
    }
});

// DELETE note
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).json({
                message: "Note not found."
            });
        }
        await note.destroy();
        res.status(200).json({
            message: "Note deleted successfully."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create note."
        });
    }
});

export default router;