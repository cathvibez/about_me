import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Link previews are a real distribution channel — this is what a recruiter
 * sees when they paste your URL into a Slack DM with the hiring manager.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1E4D5B",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#FFA48D",
          }}
        >
          {site.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 62,
            lineHeight: 1.15,
            fontWeight: 700,
            color: "#EAF1F4",
            maxWidth: 940,
          }}
        >
          {site.claim}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ display: "flex", width: 96, height: 6, background: "#FF6B4A" }} />
          <div style={{ display: "flex", fontSize: 24, color: "#C4CFD6" }}>
            {site.meta.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
