import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import { education, profile } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/motion";
import { CountUp } from "@/components/count-up";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-8">
      <SectionHeading id="about-title" eyebrow="About me" title="Turning ideas into" highlight="polished interfaces" />

      <Stagger className="grid gap-4 md:grid-cols-3">
        <StaggerItem className="group relative overflow-hidden rounded-3xl border bg-card/70 p-6 backdrop-blur-sm sm:p-8 md:col-span-2 md:row-span-2">
          <Sparkles className="mb-5 size-6 text-brand" />
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.summary.map((p, i) => (
              <p key={i} className={i === 0 ? "text-foreground" : undefined}>
                {p}
              </p>
            ))}
          </div>
          <div className="pointer-events-none absolute -right-20 -bottom-20 size-60 rounded-full bg-brand/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />
        </StaggerItem>

        <StaggerItem className="rounded-3xl border bg-card/70 p-6 backdrop-blur-sm">
          <GraduationCap className="mb-4 size-6 text-brand" />
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Education</p>
          {education.map((e) => (
            <div key={e.school} className="mt-2">
              <h3 className="text-lg font-semibold">{e.degree}</h3>
              <p className="text-muted-foreground">{e.school}</p>
              <p className="mt-1 font-mono text-sm text-brand">{e.period}</p>
            </div>
          ))}
        </StaggerItem>

        <StaggerItem className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-brand to-brand-2 p-6 text-white">
          <MapPin className="mb-4 size-6" />
          <p className="font-mono text-xs tracking-widest text-white/80 uppercase">Based in</p>
          <h3 className="mt-2 text-lg font-semibold">{profile.location}</h3>
          <p className="text-white/85">Open to remote & hybrid roles worldwide.</p>
        </StaggerItem>

        {profile.highlights.map((h) => (
          <StaggerItem key={h.label} className="rounded-3xl border bg-card/70 p-6 backdrop-blur-sm">
            <p className="text-gradient font-display text-4xl font-bold sm:text-5xl">
              <CountUp to={h.value} suffix={h.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{h.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
