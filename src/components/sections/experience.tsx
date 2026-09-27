"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { experience } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-8">
      <SectionHeading
        id="experience-title"
        eyebrow="Experience"
        title="Where I've been"
        highlight="building"
        description="Shipping production frontend code on a live commercial platform."
      />

      <div ref={ref} className="relative pl-8 sm:pl-12">
        {/* Timeline rail, drawn as you scroll */}
        <div className="absolute top-2 bottom-2 left-[11px] w-px bg-border sm:left-[19px]" aria-hidden="true" />
        <motion.div
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-linear-to-b from-brand to-brand-2 sm:left-[19px]"
        />

        <ol className="space-y-8">
          {experience.map((job) => (
            <li key={job.company + job.role} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-6 -left-8 flex size-6 items-center justify-center rounded-full border-2 border-brand bg-background sm:-left-12 sm:size-10"
              >
                <Briefcase className="size-3 text-brand sm:size-4" />
                {job.current && <span className="absolute inset-0 animate-ping rounded-full border-2 border-brand/50" />}
              </span>

              <Reveal>
                <article className="group rounded-3xl border bg-card/70 p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5 sm:p-8">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="text-xl font-semibold sm:text-2xl">{job.role}</h3>
                      <p className="text-gradient text-lg font-medium">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {job.current && (
                        <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" variant="outline">
                          Current
                        </Badge>
                      )}
                      <span className="font-mono text-sm text-muted-foreground">{job.period}</span>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {job.bullets.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.1 }}
                        className="flex gap-3 text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                        {b}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.stack.map((t) => (
                      <Badge key={t} variant="secondary" className="rounded-full px-3">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
