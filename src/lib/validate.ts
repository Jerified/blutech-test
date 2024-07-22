import { z } from "zod";

export const SignUpSchema = z.object({
    username: z.string()
    .min(3, {message: 'Username must be at least 3 characters'}).max(20)
    ,
    email: z.string().min(1, {message: 'Email is required'})
    .email('Invalid email address')
    ,
    password: z.string()
    .min(6, {message: 'Password must be at least 6 characters'})
    ,
  });

 export type SignUpSchemaType = z.infer<typeof SignUpSchema>