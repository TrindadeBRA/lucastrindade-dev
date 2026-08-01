import { useEffect, useRef } from "react";
import { DOLLAR_BILL_SRC } from "../constants";

type DollarCursorProps = {
  active: boolean;
  imageSrc?: string;
};

const CURSOR_ID = "cheat-dollar-cursor";
const STYLE_ID = "cheat-dollar-cursor-style";
const CURSOR_SIZE = 44;

function ensureCursorStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    body.cheat-dollar-cursor-active,
    body.cheat-dollar-cursor-active * {
      cursor: none !important;
    }
    #${CURSOR_ID} {
      position: fixed;
      top: 0;
      left: 0;
      width: ${CURSOR_SIZE}px;
      height: ${CURSOR_SIZE}px;
      margin: 0;
      padding: 0;
      object-fit: contain;
      pointer-events: none;
      z-index: 100040;
      transform: translate(-50%, -50%);
      filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.35));
      animation: cheatDollarCursorSpin 0.85s linear infinite;
      will-change: left, top, transform;
    }
    @keyframes cheatDollarCursorSpin {
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

export default function DollarCursor({
  active,
  imageSrc = DOLLAR_BILL_SRC,
}: DollarCursorProps) {
  const enabledRef = useRef(false);

  useEffect(() => {
    if (!active || enabledRef.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    enabledRef.current = true;
    ensureCursorStyles();
    document.body.classList.add("cheat-dollar-cursor-active");

    const cursor = document.createElement("img");
    cursor.id = CURSOR_ID;
    cursor.src = imageSrc;
    cursor.alt = "";
    cursor.draggable = false;
    cursor.setAttribute("data-cheat-ignore", "true");
    cursor.setAttribute("data-cheat-dollar", "1");
    document.body.appendChild(cursor);

    const onMove = (event: PointerEvent) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
  }, [active, imageSrc]);

  return null;
}
