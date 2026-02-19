import type { Request, Response, NextFunction } from 'express'
import { prisma } from "../lib/prisma.ts";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.ts';
import { AppError } from '../utils/AppError.ts';


export const signUp = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { email, password, name } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            },
        });

        const token = jwt.sign({ userId: newUser.id }, JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN as any })

        res.status(201).json({
            success: true,
            message: 'User created sucessfully',
            data: {
                token,
                user: newUser,
            },
        })
    } catch (error) {
        next(error)
    }
}


export const signIn = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user) {
            throw new AppError("User not found", 404)
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            throw new AppError("Invalid password", 401)
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET as string, {expiresIn: JWT_EXPIRES_IN as any})

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user
            }
        });
    } catch (error) {
        next(error)
    }
}

export const signOut = async(req: Request, res: Response, next: NextFunction) => {

}