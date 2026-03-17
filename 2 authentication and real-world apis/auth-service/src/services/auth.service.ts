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
    console.log("Step 1")
    const existingUser = await User.findOne({ where: { email } });
    console.log("Step 2")
    if (existingUser) {
        throw new Error("User already exists.");
    }
    const hashedPassword = await hashPassword(password);
    console.log("Step 3")
    const user = await User.create({
        email, 
        password: hashedPassword,
        role: UserRole.USER
    });
    console.log("Step 4")
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