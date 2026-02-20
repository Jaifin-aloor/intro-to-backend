import { Router, Request, Response } from "express";
import Comment from "../models/comment.model";
import Post from "../models/post.model";
import { validateCreateComment } from "../utils/validate";

const router = Router();

// CREATE comment
