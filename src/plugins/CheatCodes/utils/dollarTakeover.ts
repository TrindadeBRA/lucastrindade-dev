import { DOLLAR_BILL_SRC } from "../constants";

const TARGET_SELECTOR = 'img, svg, i.fa, i[class*="fa-"]';
const LAYER_ID = "cheat-dollar-takeover-layer";

type TargetRect = {
  node: HTMLElement;
  left: number;
  top: number;
  width: number;
  height: number;
};

function shouldSkip(node: Element) {
  if (node.closest("[data-cheat-ignore]")) return true;
  if (node.getAttribute("data-cheat-dollar") === "1") return true;
  if (node.classList.contains("cheat-dollar-spin")) return true;

  if (node instanceof HTMLImageElement) {
    const src = node.currentSrc || node.src || "";
    if (src.includes("dollar-bill")) return true;
  }

  return false;
}

function collectTargets() {
  const targets: TargetRect[] = [];

  document.querySelectorAll<HTMLElement>(TARGET_SELECTOR).forEach((node) => {
    if (shouldSkip(node)) return;

    const rect = node.getBoundingClientRect();
    if (rect.width < 8 || rect.height < 8) return;

    const computed = window.getComputedStyle(node);
    if (computed.display === "none" || computed.visibility === "hidden") return;
    if (Number(computed.opacity) === 0) return;

    targets.push({
      node,
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    });
  });

  return targets;
}

export function restoreAllDollarTakeovers() {
  document.getElementById(LAYER_ID)?.remove();

  document.querySelectorAll<HTMLElement>("[data-cheat-hidden]").forEach((node) => {
    node.style.visibility = "";
    node.removeAttribute("data-cheat-hidden");
  });

  document.querySelectorAll("[data-cheat-dollar]").forEach((node) => {
    node.remove();
  });
}

export function applyDollarTakeover(dollarSrc = DOLLAR_BILL_SRC) {
  restoreAllDollarTakeovers();

  const targets = collectTargets();
  if (targets.length === 0) return () => undefined;

  const layer = document.createElement("div");
  layer.id = LAYER_ID;
  layer.setAttribute("data-cheat-ignore", "true");
  layer.style.cssText = [
    "position:fixed",
    "inset:0",
    "width:100%",
    "height:100%",
    "pointer-events:none",
    "z-index:30",
    "overflow:hidden",
  ].join(";");

  const covers: HTMLImageElement[] = [];

  targets.forEach((target) => {
    target.node.style.visibility = "hidden";
    target.node.setAttribute("data-cheat-hidden", "1");

    const cover = document.createElement("img");
    cover.src = dollarSrc;
    cover.alt = "";
    cover.draggable = false;
    cover.setAttribute("data-cheat-dollar", "1");
    cover.setAttribute("data-cheat-ignore", "true");
    cover.className = "cheat-dollar-spin";
    cover.style.cssText = [
      "position:absolute",
      `left:${target.left}px`,
      `top:${target.top}px`,
      `width:${target.width}px`,
      `height:${target.height}px`,
      "object-fit:contain",
      "pointer-events:none",
      "margin:0",
    ].join(";");

    layer.appendChild(cover);
    covers.push(cover);
  });

  document.body.appendChild(layer);

  const syncPositions = () => {
    targets.forEach((target, index) => {
      const cover = covers[index];
      if (!cover || !target.node.isConnected) return;

      const rect = target.node.getBoundingClientRect();
      cover.style.left = `${rect.left}px`;
      cover.style.top = `${rect.top}px`;
      cover.style.width = `${rect.width}px`;
      cover.style.height = `${rect.height}px`;
    });
  };

  window.addEventListener("scroll", syncPositions, { passive: true, capture: true });
  window.addEventListener("resize", syncPositions);

  let disposed = false;

  return () => {
    if (disposed) return;
    disposed = true;
    window.removeEventListener("scroll", syncPositions, true);
    window.removeEventListener("resize", syncPositions);
    restoreAllDollarTakeovers();
  };
}
