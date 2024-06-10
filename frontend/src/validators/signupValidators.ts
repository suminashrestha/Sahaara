import { z } from "zod";

export const signupSchema = z
  .object( {
    email: z.string({required_error: "email is required"}).email({message: "invalid email address."}),
    username: z.string({required_error: "name is required"}).min(3,{message: "name must be atleast of 3 characters."}).max(10,{message: "name muust be less than 10 characters."}), 
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    userMode: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords donot match",
    path: ["confirmPassword"],
  });


export type Schema= z.infer<typeof signupSchema>