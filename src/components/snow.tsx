"use client";

import Snowfall from "react-snowfall";
import { useTheme } from "next-themes";

/** Decorative snowfall layered over the page, beneath the dock. */
export function Snow() {
  const { resolvedTheme } = useTheme();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 motion-reduce:hidden print:hidden">
      <Snowfall
        // White would disappear on the light theme's near-white background.
        color={resolvedTheme === "dark" ? "#ffffff" : "#8cacd4"}
        snowflakeCount={120}
        radius={[0.8, 3.2]}
        speed={[0.5, 2.2]}
        wind={[-0.5, 1.2]}
      />
    </div>
  );
}
