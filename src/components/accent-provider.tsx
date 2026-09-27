"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export const accents = [
  { id: "violet", label: "Violet", swatch: "oklch(0.62 0.22 285)" },
  { id: "emerald", label: "Emerald", swatch: "oklch(0.7 0.16 162)" },
  { id: "amber", label: "Amber", swatch: "oklch(0.75 0.16 65)" },
  { id: "rose", label: "Rose", swatch: "oklch(0.66 0.21 10)" },
  { id: "sky", label: "Sky", swatch: "oklch(0.68 0.15 238)" },
] as const;

export type Accent = (typeof accents)[number]["id"];

const STORAGE_KEY = "accent";

/** Runs before paint (inlined in <head>) so the saved accent never flashes. */
export const accentInitScript = `try{var a=localStorage.getItem("${STORAGE_KEY}");if(a)document.documentElement.dataset.accent=a}catch(e){}`;

const AccentContext = createContext<{ accent: Accent; setAccent: (a: Accent) => void }>({
  accent: "violet",
  setAccent: () => {},
});

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<Accent>("violet");

  useEffect(() => {
    const current = document.documentElement.dataset.accent as Accent | undefined;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with pre-paint script
    if (current && accents.some((a) => a.id === current)) setAccentState(current);
  }, []);

  const setAccent = useCallback((a: Accent) => {
    setAccentState(a);
    document.documentElement.dataset.accent = a;
    try {
      localStorage.setItem(STORAGE_KEY, a);
    } catch {}
  }, []);

  return <AccentContext.Provider value={{ accent, setAccent }}>{children}</AccentContext.Provider>;
}

export const useAccent = () => useContext(AccentContext);
