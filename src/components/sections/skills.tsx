import { skillGroups, skillIcon, type Skill } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

const allSkills = skillGroups.flatMap((g) => g.items);

function SkillChip({ skill, className }: { skill: Skill; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border bg-card/80 px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-md hover:shadow-brand/10",
        className,
      )}
    >
      {/* Plain <img>: CDN SVGs gain nothing from the Next image optimizer. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={skillIcon(skill.icon)}
        alt=""
        width={18}
        height={18}
        loading="lazy"
        decoding="async"
        className={cn("size-4.5", skill.invertDark && "dark:invert dark:hue-rotate-180")}
      />
      {skill.name}
    </span>
  );
}

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = reverse ? [...allSkills].reverse() : allSkills;
  return (
    <div className="group mask-fade-x flex overflow-hidden py-1.5">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className={cn(
            "animate-marquee flex shrink-0 gap-4 pr-4 group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {items.map((s) => (
            <SkillChip key={s.name} skill={s} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-8">
      <SectionHeading
        id="skills-title"
        eyebrow="Tech stack"
        title="Tools I use to"
        highlight="build & ship"
        description="A toolkit centred on the React ecosystem — from semantic markup to production deployments."
      />

      <Reveal className="-mx-4 mb-10 space-y-3 sm:mx-0">
        <MarqueeRow />
        <MarqueeRow reverse />
      </Reveal>

      <Stagger className="grid gap-4 md:grid-cols-3">
        {skillGroups.map((group) => (
          <StaggerItem
            key={group.title}
            className="group relative overflow-hidden rounded-3xl border bg-card/70 p-6 backdrop-blur-sm transition-colors hover:border-brand/40"
          >
            <h3 className="text-xl font-semibold">{group.title}</h3>
            <p className="mt-1 mb-5 text-sm text-muted-foreground">{group.description}</p>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((s) => (
                <li key={s.name}>
                  <SkillChip skill={s} className="px-3 py-1.5 text-xs" />
                </li>
              ))}
            </ul>
            <div className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
