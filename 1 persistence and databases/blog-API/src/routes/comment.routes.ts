import { Router, Request, Response } from "express";
import Comment from '../models/comment.model';
import Post from "../models/post.model";
import { validateCreateComment } from "../utils/validate";

const handlingServerErrors = (e: any, message: string, res: Response): void => {
    console.error(e);
    res.status(500).json({
        message: message
    });
};

const router = Router();

// CREATE comment
router.post("/", async (req: Request, res: Response) => {
    try {
        if (!validateCreateComment(req, res)) return;
        const { content, postId } = req.body;
        // To ensure post exists
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found."
            });
        }
        const comment = await Comment.create({
                content,
                postId
        });
        res.status(201).json(comment);
    } catch (error) {
        handlingServerErrors(error, "Failed to create comment.", res)
    }
});

// GET all comments
router.get("/", async (req: Request, res: Response) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).json(comments);
    } catch (error) {
        handlingServerErrors(error, "Failed to fetch comments.", res)
    }
});

// GET comment by id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found."
            });
        }
        res.status(200).json(comment);
    } catch (error) {
        handlingServerErrors(error, "Failed to fetch comment.", res)
    }
});

// DELETE comment
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found."
            });
        }
        await comment.destroy();
        res.status(200).json({
            message: "Comment deleted successfully."
        })
    } catch (error) {
        handlingServerErrors(error, "Failed to delete comment.", res)
    }
});

export default router;