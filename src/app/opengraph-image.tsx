import { ImageResponse } from "next/og";
import { profile, profileText } from "../content/profile";
import { siteText } from "../content/site";

// One image for both languages: the name reads the same, the role line is in English.
export const alt = siteText.en.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The share preview, drawn like the hero: prompt, name, caret, status line.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#e9ece9",
          background: "radial-gradient(900px 600px at 90% -10%, #10291c, #0a0b0a 65%)",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              border: "2px solid #4fb07f",
              borderRadius: 8,
              color: "#4fb07f",
              fontSize: 22,
            }}
          >
            QE
          </div>
          <span>quentin.euillot</span>
          <span style={{ color: "#8e9590" }}>/portfolio</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 28, color: "#8e9590" }}>{"<h1 class=\"name\">"}</span>
          <span style={{ fontSize: 124, lineHeight: 1, letterSpacing: -4 }}>{profile.firstName}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontSize: 124, lineHeight: 1, letterSpacing: -4, color: "#adb3af" }}>
              {profile.lastName}
            </span>
            <div style={{ width: 12, height: 96, background: "#4fb07f" }} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a8e2c3" }}>
          <span>→ {profileText.en.roles[0]}</span>
          <span style={{ color: "#8e9590" }}>Montpellier, FR</span>
        </div>
      </div>
    ),
    size,
  );
}
