import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const size = {
  width: 1200,
  height: 630,
};

export default async function handler(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const title = searchParams.get("title") || "Lucas Trindade";
  const role = searchParams.get("role") || "Full Stack Tech Lead";
  const subtitle =
    searchParams.get("subtitle") || "Next.js · React · Node.js · Liderança técnica";

  const previewSrc = `${origin}/images/home-preview.png`;

  const fontData = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/syne@5.2.5/latin-700-normal.woff",
  )
    .then((res) => (res.ok ? res.arrayBuffer() : null))
    .catch(() => null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "52px 56px",
          background: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: fontData ? "Syne" : "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 78% 28%, rgba(255,255,255,0.10), transparent 55%), linear-gradient(180deg, #0a0a0a 0%, #141414 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            gap: "48px",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "430px",
              height: "100%",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "9999px",
                  background: "#f5f5f5",
                }}
              />
              <div
                style={{
                  fontSize: 22,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#9a9a9a",
                  fontWeight: 600,
                }}
              >
                lucastrindade.dev
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{
                  fontSize: 64,
                  lineHeight: 1.05,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                }}
              >
                {title}
              </div>
              <div style={{ fontSize: 28, fontWeight: 600 }}>{role}</div>
              <div style={{ fontSize: 22, color: "#9a9a9a", lineHeight: 1.35 }}>
                {subtitle}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: 20,
                color: "#f5f5f5",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "9999px",
                  background: "#22c55e",
                }}
              />
              Disponível · SP, Brasil
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "640px",
                height: "336px",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
                background: "#111",
              }}
            >
              <img
                src={previewSrc}
                alt=""
                width={1200}
                height={630}
                style={{
                  width: "640px",
                  height: "336px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: "Syne",
              data: fontData,
              style: "normal",
              weight: 700,
            },
          ]
        : undefined,
    },
  );
}
