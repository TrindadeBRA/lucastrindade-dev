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
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Lucas Trindade";
  const role = searchParams.get("role") || "Full Stack Tech Lead";
  const subtitle =
    searchParams.get("subtitle") || "Next.js · React · Node.js · Liderança técnica";
  const cta = searchParams.get("cta") || "Fale comigo";

  const [fontBold, fontRegular] = await Promise.all([
    fetch("https://cdn.jsdelivr.net/fontsource/fonts/syne@5.2.5/latin-700-normal.woff")
      .then((res) => (res.ok ? res.arrayBuffer() : null))
      .catch(() => null),
    fetch("https://cdn.jsdelivr.net/fontsource/fonts/syne@5.2.5/latin-500-normal.woff")
      .then((res) => (res.ok ? res.arrayBuffer() : null))
      .catch(() => null),
  ]);

  const fonts = [
    fontBold
      ? {
          name: "Syne",
          data: fontBold,
          style: "normal" as const,
          weight: 700 as const,
        }
      : null,
    fontRegular
      ? {
          name: "Syne",
          data: fontRegular,
          style: "normal" as const,
          weight: 500 as const,
        }
      : null,
  ].filter(Boolean) as {
    name: string;
    data: ArrayBuffer;
    style: "normal";
    weight: 500 | 700;
  }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: fonts.length ? "Syne" : "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial suave — fade termina no próprio ink (#0a0a0a), sem “corte” */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 58% 52% at 16% 18%, rgba(255,255,255,0.06) 0%, #0a0a0a 68%), radial-gradient(ellipse 48% 55% at 88% 22%, rgba(255,255,255,0.05) 0%, #0a0a0a 72%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "52px 64px 48px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 18,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#8a8a8a",
              fontWeight: 500,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                backgroundColor: "#f5f5f5",
              }}
            />
            lucastrindade.dev
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 820 }}>
            <div
              style={{
                display: "flex",
                fontSize: 88,
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: "-0.05em",
                color: "#f5f5f5",
              }}
            >
              {title}
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#f0f0f0",
              }}
            >
              {role}
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 24,
                lineHeight: 1.35,
                color: "#9a9a9a",
                fontWeight: 500,
              }}
            >
              {subtitle}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 18,
                color: "#8a8a8a",
                fontWeight: 500,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 9999,
                  backgroundColor: "#22c55e",
                }}
              />
              Disponível · SP, Brasil
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 20px",
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#c8c8c8",
                fontSize: 18,
                fontWeight: 500,
                backgroundColor: "rgba(10,10,10,0.25)",
              }}
            >
              {cta}
              <span style={{ display: "flex", fontSize: 18, opacity: 0.7 }}>→</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    }
  );
}
