import { z } from "zod";

export const contactSchema = z
  .object({
    fullName: z
      .string()
      .min(1,{message: "name is required"})
      .max(20, { message: "username must be less than of 20 characters" }),
    email: z.string()
    .min(1,{message: "email is required"})
    .email({ message: "Invalid email address" }),
    phone: z.string().max(15,{message: "Invalid number"}),
    message: z.string().max(50,{message: "please make it shorter"}),
  })
export type contactForm = z.infer<typeof contactSchema>;
