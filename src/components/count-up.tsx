"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (node.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  // Server-render the final value so crawlers and no-JS users see real numbers.
  return (
    <span ref={ref} className="tabular-nums">
      {to}
      {suffix}
    </span>
  );
}
