import * as z from "zod";

export const LoginSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const TeamSchema = z.object({
  name: z.string().min(1, { message: "Team name is required" }),
  region: z.string().min(1, { message: "Region is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});
