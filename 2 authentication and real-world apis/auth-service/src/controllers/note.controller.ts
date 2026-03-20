import { NextFunction, Request, Response } from "express";
import * as noteService from "../services/note.service";

export async function createNote(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { title, content } = req.body;
        const note = await noteService.createNote({
            title, 
            content, 
            userId: req.user!.userId
        });
        res.status(201).json({
            message: "Note created successfully.",
            note
        });
    } catch (error) {
        next(error);
    }
}

export async function getNotes(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const notes = await noteService.getUserNotes(req.user!.userId);
        res.status(200).json({
            notes
        });
    } catch (error) {
        next(error);
    }
}

export async function getNote(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const noteId = Number(req.params.id);
        const note = await noteService.getNoteById(
            noteId,
            req.user!.userId
        );
        res.status(200).json({
            note
        });
    } catch (error) {
        next(error);
    }
}

export async function updateNote(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const noteId = Number(req.params.id);
        const updatedNote = await noteService.updateNote(
            noteId,
            req.user!.userId,
            req.body
        );
        res.status(200).json({
            message: "Note updated successfully.",
            note: updatedNote
        });
    } catch (error) {
        next (error);
    }
}

export async function deleteNote(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const noteId = Number(req.params.id);
        const result = await noteService.deleteNote(
            noteId,
            req.user!.userId
        );
        res.status(200).json(result);
    } catch (error) {
        next (error);
    }
}