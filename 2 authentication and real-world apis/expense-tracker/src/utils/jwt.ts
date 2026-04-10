import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { UserRole } from "../models/user.model";

export interface JwtPayload {
    userId: number;
    role: UserRole;
}

const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;

const JWT_EXPIRES_IN: SignOptions["expiresIn"] = (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "1h";

export function generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN!
    });
}

export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}