import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const ALLOWED = new Set([16, 32, 48, 64, 128, 180, 192, 256, 512, 1024]);

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const raw = Number(searchParams.get("size") || 512);
  const size = ALLOWED.has(raw) ? raw : 512;
  const letters = (searchParams.get("letters") || "LT").slice(0, 3).toUpperCase();

  const [fontBold, fontMedium] = await Promise.all([
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
    fontMedium
      ? {
          name: "Syne",
          data: fontMedium,
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

  const outer = Math.round(size * 0.82);
  const inner = Math.round(size * 0.76);
  const radiusOuter = Math.round(size * 0.22);
  const radiusInner = Math.round(size * 0.19);
  const fontSize = Math.round(size * (letters.length > 2 ? 0.22 : 0.275));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#070707",
          fontFamily: fonts.length ? "Syne" : "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 38%, rgba(255,255,255,0.07) 0%, rgba(7,7,7,0) 52%)",
          }}
        />

        {/* anel externo — borda luminosa */}
        <div
          style={{
            display: "flex",
            width: outer,
            height: outer,
            borderRadius: radiusOuter,
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.02) 70%, rgba(255,255,255,0.12) 100%)",
            zIndex: 1,
          }}
        >
          {/* placa interna */}
          <div
            style={{
              display: "flex",
              width: inner,
              height: inner,
              borderRadius: radiusInner,
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(165deg, #141414 0%, #0a0a0a 48%, #070707 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#f7f5f0",
                fontSize,
                fontWeight: 700,
                letterSpacing: "0.06em",
                lineHeight: 1,
              }}
            >
              {letters.split("").map((ch, i) => (
                <span key={`${ch}-${i}`} style={{ display: "flex" }}>
                  {ch}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: fonts.length ? fonts : undefined,
    }
  );
}
