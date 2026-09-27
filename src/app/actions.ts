"use server";

import { z } from "zod";
import { contactSchema, type ContactResult } from "@/lib/validations";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function sendContactMessage(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { name, email, subject, message, company } = parsed.data;

  // Honeypot filled → silently pretend success so bots learn nothing.
  if (company) return { ok: true, mode: "sent" };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "nehal4dev@gmail.com";

  // No mail provider configured: the client falls back to the visitor's mail app.
  if (!apiKey) return { ok: true, mode: "mailto" };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        html: `<p><strong>${escapeHtml(name)}</strong> (${escapeHtml(email)}) wrote:</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });

    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return { ok: true, mode: "sent" };
  } catch (err) {
    console.error("Contact form send failed:", err);
    return { ok: false, error: "Something went wrong sending your message. Please email me directly." };
  }
}
