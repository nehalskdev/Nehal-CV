import type { StackItem } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = { item: StackItem; variant?: "secondary" | "outline"; className?: string };

/** A tech chip: logo (or a lucide icon for tools without one) followed by the name. */
export function TechBadge({ item, variant = "secondary", className }: Props) {
  return (
    <Badge variant={variant} className={cn("gap-1.5 rounded-full px-3 py-1", className)}>
      {typeof item.icon === "string" ? (
        // eslint-disable-next-line @next/next/no-img-element -- CDN SVG logo; nothing for the optimizer to do
        <img
          src={item.icon}
          alt=""
          width={14}
          height={14}
          loading="lazy"
          decoding="async"
          className={cn("size-3.5", item.invertDark && "dark:invert dark:hue-rotate-180")}
        />
      ) : (
        <item.icon className="size-3.5 text-brand" aria-hidden="true" />
      )}
      {item.name}
    </Badge>
  );
}
