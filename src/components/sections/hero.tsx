"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin, Phone } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon, YouTubeIcon } from "@/components/icons";

const roles = ["Frontend Developer", "React Specialist", "Next.js Builder", "UI Craftsman"];
const ease = [0.22, 1, 0.36, 1] as const;

function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          className="text-gradient font-semibold whitespace-nowrap"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function AnimatedName({ text }: { text: string }) {
  return (
    <span aria-label={text} className="inline-block">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.35 + i * 0.04, duration: 0.6, ease }}
          className="inline-block origin-bottom"
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

const socialButtons = [
  { href: socials.github, label: "GitHub", Icon: GitHubIcon },
  { href: socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: socials.youtube, label: "YouTube", Icon: YouTubeIcon },
  { href: socials.email, label: "Email", Icon: Mail },
];

export function Hero() {
  return (
    <section id="home" className="relative pt-6 sm:pt-10" aria-labelledby="hero-title">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease }}
        className="overflow-hidden rounded-3xl border bg-card/70 shadow-xl shadow-black/5 backdrop-blur-sm"
      >
        {/* Banner */}
        <div className="relative h-36 overflow-hidden sm:h-52 md:h-60">
          <div className="absolute inset-0 bg-linear-to-br from-brand via-brand-2 to-brand opacity-90" />
          <motion.div
            aria-hidden="true"
            className="absolute -inset-1/2 opacity-60 [background:conic-gradient(from_0deg,transparent,rgba(255,255,255,0.35),transparent_30%)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
          <div className="bg-grid absolute inset-0 opacity-40 [--foreground:white]" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute right-6 bottom-5 hidden font-mono text-xs text-white/80 sm:block"
          >
            <span className="text-white">const</span> dev = {"{"} stack: [&quot;React&quot;, &quot;Next.js&quot;, &quot;TS&quot;] {"}"}
          </div>
        </div>

        <div className="relative px-5 pb-8 sm:px-10 sm:pb-10">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 160, damping: 16 }}
            className="relative -mt-16 mb-5 w-fit sm:-mt-24"
          >
            <div className="absolute -inset-1.5 animate-[spin_6s_linear_infinite] rounded-full bg-[conic-gradient(var(--brand),var(--brand-2),var(--brand))] blur-[2px]" />
            <div className="relative size-28 overflow-hidden rounded-full border-4 border-card bg-card sm:size-40">
              <Image
                src={profile.avatar}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(min-width: 640px) 160px, 112px"
                className="object-cover object-top"
              />
            </div>
            <span className="absolute right-1 bottom-2 flex size-5 items-center justify-center rounded-full border-4 border-card bg-emerald-500 sm:right-3 sm:bottom-3 sm:size-6">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            </span>
          </motion.div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
              >
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {profile.currentRole} @ {profile.company}
              </motion.p>

              <h1 id="hero-title" className="text-4xl leading-[1.05] font-bold [perspective:600px] sm:text-6xl md:text-7xl">
                <AnimatedName text={profile.name} />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6, ease }}
                className="mt-3 text-xl text-foreground/90 sm:text-2xl md:text-3xl"
              >
                <RotatingRole />
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05, duration: 0.6, ease }}
                className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg"
              >
                {profile.tagline}
              </motion.p>

              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
              >
                <li className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4 text-brand" /> {profile.location}
                </li>
                <li>
                  <a href={socials.email} className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
                    <Mail className="size-4 text-brand" /> {profile.email}
                  </a>
                </li>
                <li>
                  <a href={profile.phoneHref} className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
                    <Phone className="size-4 text-brand" /> {profile.phone}
                  </a>
                </li>
              </motion.ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6, ease }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="group rounded-full bg-linear-to-r from-brand to-brand-2 shadow-lg shadow-brand/25 hover:opacity-90">
                  <a href="#contact">
                    Let&apos;s talk
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <a href={profile.resume} download="Nehal-Shaikh-Resume.pdf">
                    <Download /> Resume
                  </a>
                </Button>
              </div>
              <div className="flex gap-2">
                {socialButtons.map(({ href, label, Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex size-11 items-center justify-center rounded-full border bg-background/60 text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
                  >
                    <Icon className="size-[18px]" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
