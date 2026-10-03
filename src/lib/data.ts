import { Boxes, Server, Webhook, type LucideIcon } from "lucide-react";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nehal-portfolio-yiha.vercel.app"
).replace(/\/$/, "");

/** Public Vercel Blob store holding the profile photo and resume (kept out of the repo). */
const BLOB = "https://ii7enamdiapzsgzg.public.blob.vercel-storage.com";

export const profile = {
  name: "Nehal Shaikh",
  firstName: "Nehal",
  role: "Frontend Developer",
  currentRole: "Jr Frontend Developer",
  company: "Scott Sports SA",
  location: "Mumbai, India",
  email: "nehal4dev@gmail.com",
  phone: "+91 91378 82648",
  phoneHref: "tel:+919137882648",
  avatar: `${BLOB}/nehal-shaikh.jpg`,
  resume: `${BLOB}/nehal-shaikh-resume.pdf`,
  tagline:
    "I craft fast, accessible and delightful interfaces with React, Next.js and TypeScript.",
  summary: [
    "Frontend developer from Mumbai, currently shipping production UI at Scott Sports SA with Next.js and React.",
    "I work across the React ecosystem — hooks, Redux, Context API and REST APIs — building responsive SPAs with a focus on performance and clean, reusable components.",
    "I care about the details: smooth interactions, accessible markup and interfaces that feel effortless to use. Off the keyboard, I document travels and tech on YouTube.",
  ],
  highlights: [
    { value: 7, suffix: "+", label: "Projects shipped" },
    { value: 20, suffix: "+", label: "Tools & technologies" },
    { value: 50, suffix: "%", label: "Fewer errors via Currency Converter" },
  ],
} as const;

export const socials = {
  github: "https://github.com/nehalskdev",
  linkedin: "https://www.linkedin.com/in/nehal-shaikh-a632a1a0/",
  youtube: "https://www.youtube.com/@AirborneTravellerHere",
  email: `mailto:${profile.email}`,
} as const;

/** Icons are served from the Devicon CDN (pinned) instead of being bundled in the repo. */
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons";
export const skillIcon = (slug: string, variant: "original" | "plain" = "original") =>
  `${DEVICON}/${slug}/${slug}-${variant}.svg`;

/** `icon` is a Devicon slug; `invertDark` flips near-black logos so they stay visible in dark mode. */
export type Skill = { name: string; icon: string; invertDark?: boolean };
export type SkillGroup = { title: string; description: string; items: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Core Languages",
    description: "The foundations everything else is built on.",
    items: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript (ES6+)", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
    ],
  },
  {
    title: "Frameworks & Ecosystem",
    description: "Building interactive, component-driven apps.",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs", invertDark: true },
      { name: "Redux", icon: "redux" },
      { name: "React Router", icon: "reactrouter", invertDark: true },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Sass", icon: "sass" },
      { name: "Bootstrap", icon: "bootstrap" },
      { name: "Framer Motion", icon: "framermotion", invertDark: true },
    ],
  },
  {
    title: "DevOps & Tools",
    description: "Shipping, versioning and staying productive.",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github", invertDark: true },
      { name: "Vercel", icon: "vercel", invertDark: true },
      { name: "Vite", icon: "vitejs" },
      { name: "Webpack", icon: "webpack" },
      { name: "VS Code", icon: "vscode" },
    ],
  },
];

/**
 * A tech-stack chip. `icon` is a logo URL, or a lucide icon for tools with no public logo.
 * `invertDark` flips near-black logos so they stay visible in dark mode.
 */
export type StackItem = {
  name: string;
  icon: string | LucideIcon;
  invertDark?: boolean;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  current?: boolean;
  bullets: string[];
  stack: StackItem[];
};

export const experience: Experience[] = [
  {
    role: "Jr Frontend Developer",
    company: "Scott Sports SA",
    period: "Feb 2026 — Present",
    current: true,
    bullets: [
      "Building and maintaining frontend features with Next.js and React for European E-commerce.",
      "Collaborating with design and backend teams to ship production UI code.",
      "Applying modern React/Next.js patterns in a live commercial codebase.",
    ],
    stack: [
      { name: "Next.js", icon: skillIcon("nextjs"), invertDark: true },
      { name: "TypeScript", icon: skillIcon("typescript") },
      { name: "Contentful", icon: "https://cdn.simpleicons.org/contentful" },
      { name: "Nitro API", icon: Server },
      { name: "Monorepo", icon: Boxes },
    ],
  },
];

export const education = [
  {
    degree: "Bachelor's Degree",
    school: "University of Mumbai",
    period: "2018 — 2021",
  },
];

export type Project = {
  title: string;
  description: string;
  url: string;
  tags: StackItem[];
  metric?: string;
  featured?: boolean;
  /** Optional custom thumbnail; defaults to a live screenshot of `url`. */
  image?: string;
};

/** Live screenshot via Microlink — nothing stored in the repo; Next caches the optimised result. */
export const projectThumbnail = (p: Project) =>
  p.image ??
  `https://api.microlink.io/?${new URLSearchParams({
    url: p.url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": "1280",
    "viewport.height": "800",
    waitForTimeout: "4000", // give data-fetching apps time to render past their loaders
  })}`;

/** Reusable tech chips for project tags, so each logo is defined once. */
const tech = {
  react: { name: "React", icon: skillIcon("react") },
  javascript: { name: "JavaScript", icon: skillIcon("javascript") },
  html: { name: "HTML", icon: skillIcon("html5") },
  css: { name: "CSS", icon: skillIcon("css3") },
  axios: { name: "Axios", icon: skillIcon("axios", "plain") },
  bootstrap: { name: "Bootstrap", icon: skillIcon("bootstrap") },
  framerMotion: { name: "Framer Motion", icon: skillIcon("framermotion"), invertDark: true },
  restApi: { name: "REST API", icon: Webhook },
} satisfies Record<string, StackItem>;

export const projects: Project[] = [
  {
    title: "Pokémon Battle Arena",
    description:
      "A turn-based battle simulator that pulls live Pokémon data from PokeAPI, with HP tracking, dynamic attacks and animated battle sequences.",
    url: "https://pokemon-battle-lemon.vercel.app/",
    tags: [tech.react, tech.axios, tech.bootstrap, tech.framerMotion],
    featured: true,
  },
  {
    title: "Currency Converter",
    description:
      "A real-time currency calculator powered by the ExchangeRate API, optimised with lazy loading.",
    url: "https://currency-converter-plum-gamma.vercel.app/",
    tags: [tech.react, tech.javascript, tech.restApi],
    metric: "−50% manual errors",
    featured: true,
  },
  {
    title: "Pokédex",
    description:
      "A Pokémon card collection app that lets users browse and manage their favourite cards.",
    url: "https://pokemon-cards-lac.vercel.app/",
    tags: [tech.react, tech.javascript, tech.css],
  },
  {
    title: "E-Commerce Product Page",
    description:
      "A responsive product landing page with dynamic cart functionality and product customisation.",
    url: "https://shopify-assingment.vercel.app/",
    tags: [tech.javascript, tech.html, tech.css],
  },
  {
    title: "Cinema Vault",
    description:
      "A responsive CRUD app for adding, updating and deleting movie entries efficiently.",
    url: "https://nehalskdev.github.io/cinema-vault/",
    tags: [tech.javascript, tech.html, tech.css],
  },
  {
    title: "Rock Paper Scissors",
    description:
      "An interactive game with randomised opponent logic and playful CSS animations.",
    url: "https://rock-paper-scissors-psi-tan.vercel.app/",
    tags: [tech.javascript, tech.html, tech.css],
    metric: "+60% engagement",
  },
  {
    title: "To-do App",
    description:
      "A lightweight daily task manager with smooth CSS animations to add and clear chores.",
    url: "https://todo-app-inky-nine-53.vercel.app/",
    tags: [tech.javascript, tech.html, tech.css],
  },
];

export type Video = { id: string; title: string };

export const videos: Video[] = [
  { id: "AXd7fLmivwU", title: "Hill Station Pe Hangout: Lonavla With Boys" },
  {
    id: "iaXvzxzeU24",
    title: "Food Hunting Exploration with Boys in Mumbai — Vlog #10",
  },
  { id: "Bzohy0KfC-Q", title: "They Let Me Ride Their ₹2 Lakh+ Athlete Bike!" },
  { id: "RD615HA9F84", title: "iPhone 14 Review: Upgrade from iPhone 13?" },
  {
    id: "i6Gjehq1LR8",
    title: "Redgear Cosmo 7.1 RGB Wired Gaming Headset under ₹1500",
  },
  { id: "U0P5SwgVkZ0", title: "Portronics Black iKonnect3 — Detailed Review" },
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];
