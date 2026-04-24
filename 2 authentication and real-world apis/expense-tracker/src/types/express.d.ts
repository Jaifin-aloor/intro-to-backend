import { UserRole } from "../models/user.model";
import { Request } from "express";

export interface JwtPayload {
    userId: number;
    role: UserRole;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}

export {}