import { useEffect } from "react";
import { DOLLAR_BILL_SRC, DOLLAR_TAKEOVER_MS } from "../constants";
import { applyDollarTakeover } from "../utils/dollarTakeover";

type DollarTakeoverProps = {
  burstKey: string | null;
  durationMs?: number;
  imageSrc?: string;
};

const STYLE_ID = "cheat-dollar-spin-style";

function ensureSpinStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .cheat-dollar-spin {
      animation: cheatDollarSpin 0.9s linear infinite;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35));
    }
    @keyframes cheatDollarSpin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

export default function DollarTakeover({
  burstKey,
  durationMs = DOLLAR_TAKEOVER_MS,
  imageSrc = DOLLAR_BILL_SRC,
}: DollarTakeoverProps) {
  useEffect(() => {
    if (!burstKey) return;

    ensureSpinStyles();
    const restore = applyDollarTakeover(imageSrc);
    const timer = window.setTimeout(restore, durationMs);

    return () => {
      window.clearTimeout(timer);
      restore();
    };
  }, [burstKey, durationMs, imageSrc]);

  return null;
}
