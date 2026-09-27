"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Check, Copy, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { sendContactMessage } from "@/app/actions";
import { profile, skillIcon, socials } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GitHubIcon, LinkedInIcon, YouTubeIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-sm text-destructive"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please copy it manually.");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      className="flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors hover:border-brand hover:text-brand"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  );
}

const floatingLogos = [
  { icon: "react", className: "right-8 bottom-24 size-12", duration: 7 },
  { icon: "redux", className: "right-28 bottom-8 size-9", duration: 9 },
  { icon: "vitejs", className: "right-6 bottom-6 size-8", duration: 8 },
  { icon: "tailwindcss", className: "right-36 bottom-32 size-8", duration: 10 },
  { icon: "sass", className: "right-20 bottom-44 size-8", duration: 11 },
];

/** Ambient layers for the "Find me online" card, echoing the hero banner. */
function FindMeBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute -inset-1/2 opacity-50 [background:conic-gradient(from_0deg,transparent,rgba(255,255,255,0.35),transparent_30%)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <div className="bg-grid absolute inset-0 opacity-40 [--foreground:white]" />
      <motion.div
        className="absolute -top-10 -right-10 size-40 rounded-full bg-white/20 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-16 left-1/4 size-48 rounded-full bg-brand-2/60 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      {floatingLogos.map(({ icon, className, duration }, i) => (
        <motion.img
          key={icon}
          src={skillIcon(icon)}
          alt=""
          loading="lazy"
          className={cn("absolute opacity-30 brightness-0 invert", className)}
          animate={{ y: [0, -12, 0], rotate: [0, i % 2 ? 8 : -8, 0] }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        />
      ))}
    </div>
  );
}

const inputClass = "h-11 rounded-xl bg-background/60";

export function Contact() {
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-10% 0px" });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
    // Only validate once the visitor tries to submit, then re-check live as they fix fields.
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  // Leaving the section (e.g. via the dock) dismisses any stale validation errors.
  useEffect(() => {
    if (!inView) clearErrors();
  }, [inView, clearErrors]);

  const onSubmit = (values: ContactInput) =>
    startTransition(async () => {
      const result = await sendContactMessage(values);

      if (!result.ok) {
        Object.entries(result.fieldErrors ?? {}).forEach(([field, msgs]) =>
          setError(field as keyof ContactInput, { message: msgs?.[0] }),
        );
        toast.error(result.error);
        return;
      }

      if (result.mode === "mailto") {
        const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${body}`;
        toast.success("Opening your email app…");
      } else {
        toast.success("Message sent! I'll get back to you soon.");
      }
      setSent(true);
      reset();
      setTimeout(() => setSent(false), 4000);
    });

  const field = (name: keyof ContactInput) => ({
    ...register(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <section ref={sectionRef} id="contact" aria-labelledby="contact-title" className="scroll-mt-8">
      <SectionHeading
        id="contact-title"
        eyebrow="Contact"
        title="Let's build something"
        highlight="great together"
        description="Have a role, project or idea in mind? Drop a message — I usually reply within a day."
      />

      <div className="grid gap-5 lg:grid-cols-5">
        <Reveal className="flex flex-col gap-4 lg:col-span-2">
          <div className="rounded-3xl border bg-card/70 p-6 backdrop-blur-sm">
            <ul className="space-y-5">
              <li className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Mail className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a href={socials.email} className="block truncate font-medium hover:text-brand">
                    {profile.email}
                  </a>
                </div>
                <CopyEmail />
              </li>
              <li className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Phone className="size-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <a href={profile.phoneHref} className="font-medium hover:text-brand">
                    {profile.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">{profile.location}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative flex min-h-72 flex-1 flex-col overflow-hidden rounded-3xl bg-linear-to-br from-brand to-brand-2 p-6 text-white">
            <FindMeBackdrop />
            <p className="relative font-display text-xl font-semibold">Find me online</p>
            <p className="relative mt-1 text-sm text-white/85">Code, career updates and travel stories.</p>
            <div className="relative mt-5 flex gap-3">
              {[
                { href: socials.github, label: "GitHub", Icon: GitHubIcon },
                { href: socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
                { href: socials.youtube, label: "YouTube", Icon: YouTubeIcon },
              ].map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4 }}
                  className="flex size-11 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors hover:bg-white/30"
                >
                  <Icon className="size-5" />
                </motion.a>
              ))}
            </div>
            <p className="relative mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-white" />
              </span>
              Open to new opportunities
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="relative h-full space-y-5 rounded-3xl border bg-card/70 p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" autoComplete="name" placeholder="Jane Doe" className={inputClass} {...field("name")} />
                <FieldError id="name-error" message={errors.name?.message} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" autoComplete="email" placeholder="jane@company.com" className={inputClass} {...field("email")} />
                <FieldError id="email-error" message={errors.email?.message} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Frontend role at…" className={inputClass} {...field("subject")} />
              <FieldError id="subject-error" message={errors.subject?.message} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={6} placeholder="Tell me about your project or team…" className="min-h-36 rounded-xl bg-background/60" {...field("message")} />
              <FieldError id="message-error" message={errors.message?.message} />
            </div>

            {/* Honeypot for bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company">Company</label>
              <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={pending}
              className={cn(
                "group h-12 w-full rounded-xl bg-linear-to-r from-brand to-brand-2 text-base shadow-lg shadow-brand/25 hover:opacity-90",
                sent && "from-emerald-500 to-emerald-600",
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={pending ? "pending" : sent ? "sent" : "idle"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="inline-flex items-center gap-2"
                >
                  {pending ? (
                    <>
                      <Loader2 className="animate-spin" /> Sending…
                    </>
                  ) : sent ? (
                    <>
                      <Check /> Thanks for reaching out!
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
