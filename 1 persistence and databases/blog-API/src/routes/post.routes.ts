import { Router, Request, Response } from "express";
import Post from "../models/post.model";
import User from '../models/user.model';
import { validateCreatePost, validateUpdatePost } from "../utils/validate";
import { error } from 'node:console';

const router = Router();

// CREATE post
router.post("/", async (req: Request, res: Response) => {
    try {
        if (!validateCreatePost(req, res)) return;
        const { title, content, userId }  =req.body;
        // Ensure that the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }
        const post = await Post.create({
            title,
            content,
            userId
        });
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create post."
        });
    }
});

// GET all posts
router.get("/", async (req: Request, res: Response) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch posts."
        });
    }
});

// GET post by id
router.get("/:id", async ( req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found."
            });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch post."
        });
    }
});

// Update post
router.put("/:id", async (req: Request, res: Response) => {
    try {
        if (!validateUpdatePost(req, res)) return;
        const id = Number(req.params.id);
        const { title, content } = req.body;
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found."
            });
        }
        post.title = title ?? post.title;
        post.content = content ?? post.content;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update post."
        });
    }
});

// DELETE post
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found."
            });
        }
        await Post.destroy();
        res.status(200).json({
            message: "Post deleted successfully."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete post."
        });
    }
});

export default router;