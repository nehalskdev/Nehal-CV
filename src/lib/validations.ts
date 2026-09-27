import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters.")
    .max(80, "Name is too long."),
  email: z.email("Please enter a valid email address.").trim().max(120),
  subject: z
    .string()
    .trim()
    .min(3, "Subject should be at least 3 characters.")
    .max(120, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more — at least 10 characters.")
    .max(2000, "Please keep it under 2000 characters."),
  // Honeypot — real visitors never see or fill this field.
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResult =
  | { ok: true; mode: "sent" | "mailto" }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof ContactInput, string[]>> };
