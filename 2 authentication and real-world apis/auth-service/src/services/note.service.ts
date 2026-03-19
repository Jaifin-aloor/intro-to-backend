import Note from "../models/note.model";
import { AppError } from "../utils/AppError";

interface CreateNoteInput {
    title: string;
    content: string;
    userId: number;
}

interface UpdateNoteInput {
    title?: string;
    content?: string;
}

export async function createNote(data: CreateNoteInput) {
    const { title, content, userId } = data;
    const note = await Note.create({
        title,
        content,
        userId
    });
    return note;
}

export async function getUserNotes(userId: number) {
    const notes = await Note.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]]
    });
    return notes;
}

export async function getNoteById(noteId: number, userId: number) {
    const note = await Note.findOne({
        where: {
            id: noteId,
            userId
        }
    });

    if (!note) {
        throw new AppError("Note not found", 404)
    }
    return note;
}

export async function updateNote(
    noteId: number,
    userId: number,
    data: UpdateNoteInput
) {
    const note = await Note.findOne({
        where: {
            id: noteId,
            userId
        }
    });
    if (!note) {
        throw new AppError("Note not found or unauthorized.", 404);
    }
    await note.update(data);
    return note;
}

export async function deleteNote(noteId: number, userId: number) {
    const note = await Note.findOne({
        where: {
            id: noteId,
            userId
        }
    });
    if (!note) {
        throw new AppError("Note not found or unauthorized.", 404);
    }
    await note.destroy();
    return { message: "Note deleted successfully."};
}