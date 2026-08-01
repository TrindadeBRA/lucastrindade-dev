import { useEffect, useRef } from "react";
import { DOLLAR_BILL_SRC } from "../constants";
import { applyDollarTakeover } from "../utils/dollarTakeover";

type DollarTakeoverProps = {
  burstKey: string | null;
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
  imageSrc = DOLLAR_BILL_SRC,
}: DollarTakeoverProps) {
  const activeRef = useRef(false);
  const disposeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!burstKey) return;

    ensureSpinStyles();

    if (!activeRef.current) {
      activeRef.current = true;
      disposeRef.current = applyDollarTakeover(imageSrc);
      return;
    }

    disposeRef.current?.();
    disposeRef.current = applyDollarTakeover(imageSrc);
  }, [burstKey, imageSrc]);

  return null;
}
