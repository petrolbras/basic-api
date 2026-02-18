import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Prisma } from "../generated/prisma/client.ts";

export const errorMiddleware: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    try {
        let error = { ...err }

        console.error(err)

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                const message = 'Unique constraint failed'
                error = new Error(message)
                error.statusCode = 409;
            }
            if (err.code === 'P2025') {
                const message = 'Record not found'
                error = new Error(message)
                error.statusCode = 404;
            }
            if (err.code === 'P2003') {
                const message = 'Foregin key constraint failed'
                error = new Error(message)
                error.statusCode = 400;
            }
            if (err.code === 'P2014'){
                const message = 'Invalid Relation'
                error = new Error(message)
                error.statusCode = 422
            }
        }

        if (err instanceof Prisma.PrismaClientValidationError) {
            console.error(`Validation error! Message: ${error.message}`)
        }

        res.status(500).json({
            errors: [{ message: 'Something went wrong.' }],
        });
    } catch (error) {
        next(error)
    }
}