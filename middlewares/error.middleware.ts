import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";

export const errorMiddleware: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    try {

        console.error(err)

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    errors: [{ message: 'Unique constraint failed' }]
                });
            }
            if (err.code === 'P2025') {
                return res.status(404).json({
                    errors: [{ message: 'Record not found' }]
                });
            }
            if (err.code === 'P2003') {
                return res.status(400).json({
                    errors: [{ message: 'Foreign key constraint failed' }]
                });
            }
            if (err.code === 'P2014'){
                return res.status(422).json({
                    errors: [{ message: 'Invalid relation' }]
                });
            }
        }

        if (err instanceof Prisma.PrismaClientValidationError) {
            return res.status(400).json({
                errors: [{ message: 'Validation error' }]
            });
        }

        res.status(500).json({ success: false, message: 'Something went wrong.' });
    } catch (error) {
        next(error)
    }
}