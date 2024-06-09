import { z } from "zod";

export const formSchema=z.object({
    email: z.string().email(),
    username: z.string().min(3).max(10),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
})
.refine((data)=>data.password===data.confirmPassword,
{
    message: "passwords donot match",
    path: ['confirmPassword']
})