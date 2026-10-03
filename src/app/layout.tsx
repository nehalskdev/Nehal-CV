import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import { accentInitScript } from "@/components/accent-provider";
import { profile, siteUrl, skillGroups, socials } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const title = `${profile.name} — ${profile.role} | React, Next.js & TypeScript`;
const description = `${profile.name} is a ${profile.role.toLowerCase()} in ${profile.location}, currently a ${profile.currentRole} at ${profile.company}. Explore projects, skills and experience building fast, accessible web apps with React, Next.js and TypeScript.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  applicationName: `${profile.name} Portfolio`,
  keywords: [
    profile.name,
    "Nehal Shaikh portfolio",
    "Frontend Developer",
    "Frontend Developer Mumbai",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Web Developer India",
    "Web Resume",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${profile.name} — Portfolio`,
    title,
    description,
    locale: "en_IN",
    firstName: "Nehal",
    lastName: "Shaikh",
    username: "nehalskdev",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@Nehal_s_k",
  },
  // Add your Google Search Console token here once verified:
  // verification: { google: "your-token" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafc" },
    { media: "(prefers-color-scheme: dark)", color: "#121218" },
  ],
};

const personId = `${siteUrl}/#person`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      url: siteUrl,
      image: profile.avatar,
      email: `mailto:${profile.email}`,
      jobTitle: profile.role,
      description,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressCountry: "IN",
      },
      worksFor: { "@type": "Organization", name: profile.company },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Mumbai",
      },
      knowsAbout: skillGroups.flatMap((g) => g.items.map((s) => s.name)),
      sameAs: [socials.github, socials.linkedin, socials.youtube],
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: title,
      inLanguage: "en",
      dateModified: new Date().toISOString(),
      mainEntity: { "@id": personId },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${profile.name} — Portfolio`,
      publisher: { "@id": personId },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <script dangerouslySetInnerHTML={{ __html: accentInitScript }} />
        {/* Without JS, entrance animations never run — show everything as-is. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
