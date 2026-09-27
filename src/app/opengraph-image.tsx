import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const avatar = await readFile(join(process.cwd(), "public", "nehal-shaikh.jpg"));
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "72px",
          gap: "64px",
          background: "linear-gradient(135deg, #0f0f1a 0%, #1e1433 55%, #3b1d4a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: 8,
            borderRadius: 9999,
            background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt=""
            width={300}
            height={300}
            style={{ borderRadius: 9999, objectFit: "cover", objectPosition: "top" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 26, color: "#c4b5fd", letterSpacing: 4, textTransform: "uppercase" }}>
            Web Resume
          </div>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, marginTop: 12 }}>{profile.name}</div>
          <div
            style={{
              fontSize: 44,
              marginTop: 12,
              backgroundImage: "linear-gradient(90deg, #a78bfa, #f472b6)",
              backgroundClip: "text",
              color: "transparent",
              fontWeight: 700,
            }}
          >
            {profile.role}
          </div>
          <div style={{ fontSize: 28, color: "#d4d4d8", marginTop: 24 }}>
            React · Next.js · TypeScript · Tailwind CSS
          </div>
          <div style={{ fontSize: 24, color: "#a1a1aa", marginTop: 16 }}>{`📍 ${profile.location}`}</div>
        </div>
      </div>
    ),
    size,
  );
}
