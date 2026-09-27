import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #7c3aed, #db2777)",
          color: "white",
          fontSize: 88,
          fontWeight: 800,
          letterSpacing: -3,
        }}
      >
        NS
      </div>
    ),
    size,
  );
}
