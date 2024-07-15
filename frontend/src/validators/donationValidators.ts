import { z } from "zod";

export const donationSchema = z
  .number()
  .min(1, "You must enter some amount to donate");

export type donationType = z.infer<typeof donationSchema>;
