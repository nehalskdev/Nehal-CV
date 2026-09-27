"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { projectThumbnail, projects, socials, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons";

function ProjectCard({ project, wide }: { project: Project; wide: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [thumb, setThumb] = useState<"loading" | "loaded" | "error">("loading");
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, color-mix(in oklch, var(--brand) 16%, transparent), transparent 70%)`;

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mx.set(x);
    my.set(y);
    ry.set((x / rect.width - 0.5) * 8);
    rx.set(-(y / rect.height - 0.5) * 8);
  }

  function onLeave() {
    mx.set(-400);
    my.set(-400);
    rx.set(0);
    ry.set(0);
  }

  const host = new URL(project.url).hostname.replace("www.", "");

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card/70 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-2xl hover:shadow-brand/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <motion.div aria-hidden="true" style={{ background: spotlight }} className="pointer-events-none absolute inset-0 z-10" />

      {/* Cover: faux browser window showing a live screenshot, with the monogram as placeholder/fallback */}
      <div className="relative m-2 overflow-hidden rounded-2xl border bg-linear-to-br from-brand/15 via-background to-brand-2/15">
        <div className="flex items-center gap-1.5 border-b bg-background/60 px-3 py-2">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 truncate rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{host}</span>
        </div>
        <div className="relative flex h-44 items-center justify-center sm:h-48">
          <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
          {thumb !== "error" && (
            <Image
              src={projectThumbnail(project)}
              alt={`Screenshot of ${project.title}`}
              fill
              sizes={wide ? "(min-width: 1024px) 740px, (min-width: 640px) 90vw, 95vw" : "(min-width: 1024px) 370px, (min-width: 640px) 45vw, 95vw"}
              onLoad={() => setThumb("loaded")}
              onError={() => setThumb("error")}
              className={cn(
                "z-1 object-cover object-top transition-[opacity,scale] duration-700 group-hover:scale-105",
                thumb === "loaded" ? "opacity-100" : "opacity-0",
              )}
            />
          )}
          <span className="text-gradient relative font-display text-5xl font-bold transition-transform duration-500 group-hover:scale-110 sm:text-6xl">
            {project.title
              .split(/\s+/)
              .slice(0, 2)
              .map((w) => w[0])
              .join("")}
          </span>
          {project.featured && (
            <span className="absolute top-3 right-3 z-2 inline-flex items-center gap-1 rounded-full bg-linear-to-r from-brand to-brand-2 px-2 py-0.5 text-[10px] font-semibold text-white">
              <Star className="size-3 fill-current" /> Featured
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-primary-foreground">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{project.description}</p>
        {project.metric && (
          <p className="mt-3 w-fit rounded-md bg-brand/10 px-2 py-1 font-mono text-xs font-semibold text-brand">{project.metric}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <Badge key={t} variant="outline" className="rounded-full font-normal">
              {t}
            </Badge>
          ))}
        </div>
      </div>
      <span className="sr-only">(opens live demo in a new tab)</span>
    </motion.a>
  );
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-8">
      <SectionHeading
        id="projects-title"
        eyebrow="Selected work"
        title="Things I've"
        highlight="built"
        description="Open-source projects exploring React, APIs, state and motion — every one is live, so go ahead and click around."
      />

      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {projects.map((p, i) => (
          <StaggerItem key={p.title} className={i === 0 ? "sm:col-span-2" : undefined}>
            <ProjectCard project={p} wide={i === 0} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="lg" className="rounded-full">
          <a href={socials.github} target="_blank" rel="noopener noreferrer">
            <GitHubIcon className="size-4" /> More on GitHub
          </a>
        </Button>
      </Reveal>
    </section>
  );
}
