import User, { UserRole } from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { AppError } from '../utils/appError';

interface SignupInput {
    email: string;
    password: string;
}

interface LoginInput {
    email: string;
    password: string;
}

export async function signup(data: SignupInput) {
    const { email, password } = data;

    // check if user exists
    const existingUser = await User.findOne({where: { email } });

    if (existingUser) {
        throw new AppError("User already exists", 400);
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // create user
    const user = await User.create({
        email, 
        password: hashedPassword,
        role: UserRole.USER
    });

    return {
        id: user.id,
        email: user.email
    };
}

export async function login(data: LoginInput) {
    const { email, password } = data;
    const user = await User.findOne({ where: { email }});
    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new AppError("Invalid credentials", 401);
    }
    const token = generateToken({
        userId: user.id,
        role: user.role
    });
    return { token };
}