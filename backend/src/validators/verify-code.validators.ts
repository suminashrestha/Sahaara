import z from "zod";

export const verifySchema = z.object({
  code: z
    .string()
    .min(6, "Your code must be 6 digits long")
    .max(6, "Your code must be 6 digits long"),
});

export type verifyCodeInput = z.infer<typeof verifySchema>;
