"use client";

import { useSyncExternalStore } from "react";

const team = [
  { x: 185, nose: "#3a2414", delay: "-0.4s" },
  { x: 330, nose: "#3a2414", delay: "-0.2s" },
  { x: 475, nose: "#e5252a", delay: "0s" },
];

function Deer({ x, nose, delay }: (typeof team)[number]) {
  return (
    <g transform={`translate(${x} 50)`}>
      <g className="animate-hop" style={{ animationDelay: delay }}>
        <path d="M34 62 L14 72 L2 92" fill="none" stroke="#a8560b" strokeWidth="6" />
        <path d="M70 60 L92 70 L106 62" fill="none" stroke="#a8560b" strokeWidth="6" />
        <path d="M12 50 C20 38 46 36 62 38 C68 30 72 22 76 14 L94 22 C91 36 87 52 78 62 C66 72 44 74 30 68 C18 64 10 58 12 50Z" fill="#e07f12" />
        <path d="M14 50 C8 44 6 40 10 36 C14 38 18 42 20 46Z" fill="#fbeed2" />
        <path d="M30 64 L26 82 L8 100" fill="none" stroke="#e07f12" strokeWidth="7" />
        <path d="M70 62 L86 84 L104 82" fill="none" stroke="#e07f12" strokeWidth="7" />
        <path d="M70 32 L92 40" fill="none" stroke="#f4b740" strokeWidth="5" />
        <path d="M84 8 L76 -12 M80 -3 L66 -7 M77 -9 L68 -19 M92 6 L95 -14 M93 -4 L105 -9 M95 -11 L105 -21" fill="none" stroke="#7a5a44" strokeWidth="4" />
        <path d="M76 18 C78 8 90 4 98 8 L116 16 C121 20 120 26 113 27 L96 29 C87 29 79 26 76 18Z" fill="#e07f12" />
        <path d="M81 12 L66 7 L75 20Z" fill="#a8560b" />
        <circle cx="97" cy="15" r="2.2" fill="#3a2414" />
        <circle cx="117" cy="22" r="4.5" fill={nose} />
      </g>
    </g>
  );
}

function usePageLoaded() {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("load", onChange);
      return () => window.removeEventListener("load", onChange);
    },
    () => document.readyState === "complete",
    () => false,
  );
}

/** Decorative one-off: Santa's sleigh and reindeer cross the viewport once after the page loads. */
export function Reindeer() {
  const loaded = usePageLoaded();
  if (!loaded) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-[12%] z-40 overflow-hidden py-3 print:hidden">
      <svg viewBox="0 0 640 175" strokeLinecap="round" strokeLinejoin="round" className="animate-reindeer h-auto w-80 max-w-none sm:w-[34rem]">
        <path d="M132 76 Q196 118 261 84 Q334 122 406 84 Q479 122 551 84" fill="none" stroke="#f0a63c" strokeWidth="3" />

        {team.map((deer) => (
          <Deer key={deer.x} {...deer} />
        ))}

        {/* Toy sack */}
        <path d="M22 96 C14 70 34 50 52 54 C72 58 76 84 68 100Z" fill="#b5793f" />
        <rect x="30" y="34" width="26" height="24" rx="3" fill="#e5252a" transform="rotate(-10 43 46)" />
        <path d="M43 32 L47 58 M31 46 L56 41" fill="none" stroke="#f4d35e" strokeWidth="4" />

        {/* Santa */}
        <path d="M60 110 C58 80 70 62 88 62 C106 62 116 82 112 110Z" fill="#d92b32" />
        <path d="M90 78 L128 76" fill="none" stroke="#d92b32" strokeWidth="12" />
        <circle cx="131" cy="76" r="7.5" fill="#1f6f4a" />
        <path d="M122 70 L122 83" fill="none" stroke="#fff" strokeWidth="5" />
        <circle cx="94" cy="44" r="14" fill="#f6c8a4" />
        <path d="M80 44 C78 66 92 76 100 74 C110 70 112 56 108 44 C102 52 88 52 80 44Z" fill="#fff" stroke="#e4e7ee" strokeWidth="1" />
        <path d="M84 36 C80 18 60 14 52 24 C64 22 68 28 70 38Z" fill="#d92b32" />
        <path d="M84 36 C86 22 102 22 106 36Z" fill="#d92b32" />
        <path d="M78 38 L108 36" fill="none" stroke="#fff" strokeWidth="8" />
        <circle cx="51" cy="27" r="6.5" fill="#fff" stroke="#e4e7ee" strokeWidth="1" />
        <circle cx="99" cy="46" r="2" fill="#3a2414" />

        {/* Sleigh */}
        <path d="M20 150 H130 C152 150 162 140 157 128 C152 118 139 122 142 132" fill="none" stroke="#f0a63c" strokeWidth="6" />
        <path d="M52 130 V150 M108 130 V150" fill="none" stroke="#f0a63c" strokeWidth="6" />
        <path d="M12 92 C8 80 24 76 30 88 C38 106 50 108 70 108 L112 106 C118 94 134 90 142 98 C149 106 142 114 134 114 C130 126 118 136 100 136 H52 C30 136 16 118 12 92Z" fill="#ef3b3f" />
        <path d="M30 88 C38 106 50 108 70 108 L112 106" fill="none" stroke="#fbeed2" strokeWidth="4" />
      </svg>
    </div>
  );
}
