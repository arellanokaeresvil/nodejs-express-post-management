import { z } from 'zod'

export const createUserSchema = z.object({
    first_name: z
    .string({ error: 'First name is required'})
    .min(2, 'First name must be at least 2 characters')
    .max(100),

    last_name: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(100),

    email: z
    .email('Invalid email address'),

    password: z
    .string()
    .min(8, 'Password must be at least 8 characters')

})

export type CreateUserRequest = z.infer<typeof createUserSchema>