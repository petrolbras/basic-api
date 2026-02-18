import { z } from 'zod'

export const createUserSchema = z.object({
    name: z
    .string()
    .trim()
    .min(2, "Name must have at least 2 characters"),

    email: z
    .email(),

    password: z
    .string()
    .min(6, 'Password must have at least 6 characters'),

    id: z
    .uuid()
})