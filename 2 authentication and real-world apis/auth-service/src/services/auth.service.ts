import User, { UserRole } from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';


interface SignupInput {
    email: string;
    password: string;
}

interface LoginInput {
    email: string;
    password: string;
}

export async function signup(data: SignupInput) {
    const {email, password} = data;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        throw new Error("User already exists.");
    }
    const hashedPassword = await hashPassword(password);

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
        throw new Error("Invalid credentials.");
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
        throw new Error("Invalid credentials.");
    }

    const token = generateToken({
        userId: user.id,
        role: user.role
    });

    return {
        token
    };
}