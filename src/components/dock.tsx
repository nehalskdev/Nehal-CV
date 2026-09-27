"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Briefcase, FolderGit2, Home, Layers, Mail, Moon, Palette, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { navItems, socials, type SectionId } from "@/lib/data";
import { accents, useAccent } from "@/components/accent-provider";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const icons: Record<SectionId, React.ComponentType<{ className?: string }>> = {
  home: Home,
  about: User,
  skills: Layers,
  experience: Briefcase,
  projects: FolderGit2,
  contact: Mail,
};

function useActiveSection() {
  const [active, setActive] = useState<SectionId>("home");
  const lockUntil = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockUntil.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /** Mark a section active right away and ignore sections passed during the smooth scroll. */
  const jumpTo = useCallback((id: SectionId) => {
    lockUntil.current = Date.now() + 1000;
    setActive(id);
  }, []);

  return [active, jumpTo] as const;
}

const desktopQuery = "(min-width: 768px)";

function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(desktopQuery);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(desktopQuery).matches,
    () => false,
  );
}

const spring = { type: "spring", stiffness: 320, damping: 30 } as const;

/** Animates a dock slot's width and spacing in and out, so the bar folds rather than jumps. */
function Fold({
  show,
  pad,
  delay = 0,
  className,
  children,
}: {
  show: boolean;
  pad: number;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const hidden = { width: 0, paddingLeft: 0, paddingRight: 0, opacity: 0, scale: 0.4 };
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={hidden}
          animate={{ width: "auto", paddingLeft: pad, paddingRight: pad, opacity: 1, scale: 1, transition: { ...spring, delay } }}
          exit={{ ...hidden, transition: spring }}
          className={cn("flex shrink-0 items-center justify-center self-stretch sm:items-end", className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockItemProps = {
  mouseX: MotionValue<number>;
  label: string;
  active?: boolean;
  className?: string;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  expanded?: boolean;
};

const itemClass =
  "relative flex aspect-square shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none max-sm:!size-9";

function DockItem({ mouseX, label, active, className, children, href, external, onClick, expanded }: DockItemProps) {
  const ref = useRef<HTMLElement>(null);

  // macOS-style magnification: items grow as the cursor approaches them.
  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - rect.x - rect.width / 2;
  });
  const sizeRaw = useTransform(distance, [-120, 0, 120], [40, 58, 40]);
  const size = useSpring(sizeRaw, { mass: 0.1, stiffness: 180, damping: 14 });

  const classes = cn(
    itemClass,
    active && "text-primary-foreground hover:text-primary-foreground",
    className,
  );

  const content = (
    <>
      {active && (
        <motion.span
          layoutId="dock-active"
          className="absolute inset-0 rounded-full bg-linear-to-br from-brand to-brand-2 shadow-lg shadow-brand/30"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex size-full items-center justify-center [&_svg]:size-[45%]">
        {children}
      </span>
    </>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {href ? (
          <motion.a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={onClick}
            aria-label={label}
            aria-current={active ? "location" : undefined}
            aria-expanded={expanded}
            style={{ width: size, height: size }}
            className={classes}
          >
            {content}
          </motion.a>
        ) : (
          <motion.button
            ref={ref as React.Ref<HTMLButtonElement>}
            type="button"
            onClick={onClick}
            aria-label={label}
            style={{ width: size, height: size }}
            className={classes}
          >
            {content}
          </motion.button>
        )}
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={10}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

function ThemeToggle({ mouseX }: { mouseX: MotionValue<number> }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- theme is only known on the client
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <DockItem mouseX={mouseX} label="Toggle theme" onClick={() => setTheme(isDark ? "light" : "dark")}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex size-full items-center justify-center"
        >
          {isDark ? <Moon /> : <Sun />}
        </motion.span>
      </AnimatePresence>
    </DockItem>
  );
}

function AccentPicker() {
  const { accent, setAccent } = useAccent();

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger
            aria-label="Change accent colour"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:size-10"
          >
            <Palette className="size-[45%]" />
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={10}>
          Accent colour
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side="top" align="end" sideOffset={14} className="w-44">
        <DropdownMenuLabel>Accent colour</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {accents.map((a) => (
          <DropdownMenuItem key={a.id} onSelect={() => setAccent(a.id)} className="gap-3">
            <span
              className={cn(
                "size-4 rounded-full ring-2 ring-offset-2 ring-offset-popover",
                accent === a.id ? "ring-foreground/60" : "ring-transparent",
              )}
              style={{ background: a.swatch }}
            />
            {a.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Dock() {
  const mouseX = useMotionValue(Infinity);
  const [active, jumpTo] = useActiveSection();
  const isDesktop = useIsDesktop();
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Desktop rests as a single circle showing the active section; mobile is always the full bar.
  const collapsed = isDesktop && !expanded;
  const pad = isDesktop ? 4 : 2;
  // On desktop, let the glide to centre lead slightly before the items unfold.
  const unfoldDelay = isDesktop ? 0.12 : 0;

  // Fold back up on outside click or Escape (the accent menu renders in a portal, so it counts as inside).
  useEffect(() => {
    if (!isDesktop || !expanded) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element;
      if (navRef.current?.contains(target) || target.closest?.('[data-slot="dropdown-menu-content"]')) return;
      setExpanded(false);
    };
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setExpanded(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isDesktop, expanded]);

  function onNavClick(e: React.MouseEvent, id: SectionId) {
    if (collapsed) {
      e.preventDefault();
      setExpanded(true);
      return;
    }
    jumpTo(id);
    if (isDesktop) setExpanded(false);
  }

  return (
    <motion.nav
      ref={navRef}
      aria-label="Primary"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 22 }}
      className={cn(
        "fixed inset-x-0 bottom-3 z-50 flex px-3 sm:bottom-5",
        isDesktop ? cn("pointer-events-none px-6 sm:bottom-6", expanded ? "justify-center" : "justify-start") : "justify-center",
      )}
    >
      <motion.div
        // Glides between the left corner (collapsed) and the centre (expanded) as alignment changes.
        layout="position"
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        onMouseMove={(e) => !collapsed && mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass pointer-events-auto flex h-14 items-center rounded-full border px-1.5 shadow-2xl shadow-black/10 sm:h-16 sm:items-end sm:px-2 sm:pb-3"
      >
        {navItems.map(({ id, label }) => {
          const Icon = icons[id];
          const isActive = active === id;
          return (
            <Fold key={id} show={!collapsed || isActive} pad={pad} delay={unfoldDelay} className={id === "home" ? "max-[359px]:hidden" : undefined}>
              <DockItem
                mouseX={mouseX}
                href={`#${id}`}
                label={collapsed ? `Open menu · ${label}` : label}
                active={isActive}
                expanded={isDesktop && isActive ? expanded : undefined}
                onClick={(e) => onNavClick(e, id)}
              >
                <Icon />
              </DockItem>
            </Fold>
          );
        })}
        <Fold show={!collapsed} pad={pad} delay={unfoldDelay} className="self-center max-sm:hidden">
          <span className="h-8 w-px bg-border" aria-hidden="true" />
        </Fold>
        <Fold show={!collapsed} pad={pad} delay={unfoldDelay} className="max-sm:hidden">
          <DockItem mouseX={mouseX} href={socials.github} external label="GitHub">
            <GitHubIcon />
          </DockItem>
        </Fold>
        <Fold show={!collapsed} pad={pad} delay={unfoldDelay} className="max-sm:hidden">
          <DockItem mouseX={mouseX} href={socials.linkedin} external label="LinkedIn">
            <LinkedInIcon />
          </DockItem>
        </Fold>
        <Fold show={!collapsed} pad={pad} delay={unfoldDelay} className="self-center">
          <span className="h-8 w-px bg-border" aria-hidden="true" />
        </Fold>
        <Fold show={!collapsed} pad={pad} delay={unfoldDelay}>
          <ThemeToggle mouseX={mouseX} />
        </Fold>
        <Fold show={!collapsed} pad={pad} delay={unfoldDelay}>
          <AccentPicker />
        </Fold>
      </motion.div>
    </motion.nav>
  );
}
