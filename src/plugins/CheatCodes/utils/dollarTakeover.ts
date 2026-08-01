import { DOLLAR_BILL_SRC } from "../constants";

const TARGET_SELECTOR = 'img, svg, i.fa, i[class*="fa-"]';

function shouldSkip(node: Element) {
  if (node.closest("[data-cheat-ignore]")) return true;
  if (node.getAttribute("data-cheat-dollar") === "1") return true;
  if (node.getAttribute("data-cheat-hidden") === "1") return true;

  if (node instanceof HTMLImageElement) {
    const src = node.currentSrc || node.src || "";
    if (src.includes("dollar-bill")) return true;
  }

  return false;
}

function placeCover(node: HTMLElement, parent: HTMLElement, dollarSrc: string) {
  const nodeRect = node.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  if (nodeRect.width < 8 || nodeRect.height < 8) return null;

  const computed = window.getComputedStyle(node);
  if (computed.display === "none" || computed.visibility === "hidden") return null;

  const cover = document.createElement("img");
  cover.src = dollarSrc;
  cover.alt = "";
  cover.draggable = false;
  cover.setAttribute("data-cheat-dollar", "1");
  cover.setAttribute("data-cheat-ignore", "true");
  cover.className = "cheat-dollar-spin";

  const left = nodeRect.left - parentRect.left + parent.scrollLeft;
  const top = nodeRect.top - parentRect.top + parent.scrollTop;

  cover.style.cssText = [
    "position:absolute",
    `left:${left}px`,
    `top:${top}px`,
    `width:${nodeRect.width}px`,
    `height:${nodeRect.height}px`,
    "object-fit:contain",
    "pointer-events:none",
    "z-index:6",
    "margin:0",
  ].join(";");

  return cover;
}

export function applyDollarTakeover(dollarSrc = DOLLAR_BILL_SRC) {
  const restorers: Array<() => void> = [];
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(TARGET_SELECTOR));

  for (const node of nodes) {
    if (shouldSkip(node)) continue;

    const parent = node.parentElement;
    if (!parent) continue;

    const cover = placeCover(node, parent, dollarSrc);
    if (!cover) continue;

    const prevParentPosition = parent.style.position;
    const parentPosition = window.getComputedStyle(parent).position;
    if (parentPosition === "static") {
      parent.style.position = "relative";
    }

    const prevVisibility = node.style.visibility;
    node.style.visibility = "hidden";
    node.setAttribute("data-cheat-hidden", "1");
    parent.appendChild(cover);

    restorers.push(() => {
      cover.remove();
      node.style.visibility = prevVisibility;
      node.removeAttribute("data-cheat-hidden");
      if (parentPosition === "static") {
        parent.style.position = prevParentPosition;
      }
    });
  }

  return () => {
    restorers.forEach((restore) => restore());
  };
}
