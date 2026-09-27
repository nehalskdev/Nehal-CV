import { Reveal } from "@/components/motion";

type Props = { id?: string; eyebrow: string; title: string; highlight?: string; description?: string };

export function SectionHeading({ id, eyebrow, title, highlight, description }: Props) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand">
        <span className="h-px w-8 bg-brand" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-bold sm:text-4xl md:text-5xl">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
