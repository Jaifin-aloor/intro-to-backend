import noteController from "../controller/noteController.js";
import validate from "../helper/validate.js";
import { createNoteSchema, updateNoteSchema } from "../schema/noteSchema.js";
import BaseRoutes from "./base/baseRouter.js";
import { Router } from 'express';

class NoteRoutes extends BaseRoutes{
    public routes(): void {
        this.router.post("", validate(createNoteSchema), noteController.create);
        this.router.patch(
            "/:id", 
            validate(updateNoteSchema),
            noteController.update
        );
        this.router.delete("/:id", noteController.delete);
        this.router.get("", noteController.findAll);
        this.router.get("/:id", noteController.findById);
    }
}

export default new NoteRoutes().router;