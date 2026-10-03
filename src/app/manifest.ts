import type { MetadataRoute } from "next";
import { profile } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.firstName,
    description: profile.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#121218",
    theme_color: "#7c3aed",
    icons: [{ src: profile.avatar, sizes: "400x400", type: "image/jpeg" }],
  };
}
