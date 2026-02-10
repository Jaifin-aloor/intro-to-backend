import type { Request, Response } from "express";
import { Note } from "../model/Note.js"
import { NoteRepo } from "../repository/noteRepo.js";

class NoteController{

    async create(req: Request, res: Response){
        try{
            const new_note = new Note();
            new_note.name = req.body.name;
            new_note.description = req.body.description;

            await new NoteRepo().save(new_note);

            res.status(201).json({
                status: "Note created sucessfully",
                message: "Successfully created note."
            });
        }catch(error){
            res.status(500).json({error: "internal server error."});
        }
    }

    async delete(req: Request, res: Response){
        try{
            let id = parseInt(String(req.params["id"]));
            await new NoteRepo().delete(id);
            res.status(200).json({
                status: "deleted note successfully.",
                message: "Successfully deleted note."
            });
        }catch(error){
            res.status(500).json({error: "internal server error."});
        }
    }

    async findAll(req: Request, res: Response){
        try{
            const new_note = await new NoteRepo().retriveAll();
            res.status(200).json({
                status: "OK!",
                message: "Succesfully fetched all note data!",
                data: new_note
            });
        }catch(error){
            res.status(500).json({error: "internal server error."});
        }
    }

    async findById(req: Request, res:Response){
        try{
            let id = parseInt(String(req.params["id"]));
            const new_note = await new NoteRepo().retriveById(id);
            res.status(200).json({
                status: "OK!",
                message: "Succesfully fetched note data by id!",
                data: new_note
            });
        }catch(error){
            res.status(500).json({error: "internal server error."});
        }
    }

    async update(req: Request, res: Response){
        try{
            let id = parseInt(String(req.params["id"]));
            const repo = new NoteRepo();
            const new_note = await repo.retriveById(id);
            
            if (!new_note){
                return res.status(404).json({error: "note not found."});
            }
            if (req.body.name !== undefined){
                new_note.name = req.body.name;
            }
            if (req.body.description !== undefined){
                new_note.description = req.body.description;
            }
            await repo.update(new_note);

            res.status(200).json({
                status: "OK!",
                message: "Succesfully updated note data by id!",
            });
        }catch(error) {
            res.status(500).json({error: "internal server error."});
        }
    }
}

export default new NoteController();