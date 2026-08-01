import { useEffect, useRef } from "react";
import { BUFFER_IDLE_RESET_MS } from "../constants";
import type { CheatCodeDefinition } from "../types";

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;

  return Boolean(target.closest("[contenteditable='true']"));
}

function normalizeInput(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeCodes(codes: CheatCodeDefinition[]) {
  return codes
    .map((entry) => ({
      ...entry,
      code: normalizeInput(entry.code),
    }))
    .filter((entry) => entry.code.length > 0)
    .sort((a, b) => b.code.length - a.code.length);
}

function findMatch(buffer: string, codes: CheatCodeDefinition[]) {
  return (
    codes.find((cheat) => buffer.endsWith(cheat.code)) ??
    codes.find((cheat) => buffer.includes(cheat.code)) ??
    null
  );
}

export function useCheatListener(
  codes: CheatCodeDefinition[],
  onMatch: (cheat: CheatCodeDefinition) => void,
  enabled = true,
) {
  const bufferRef = useRef("");
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onMatchRef = useRef(onMatch);
  const codesRef = useRef(normalizeCodes(codes));

  useEffect(() => {
    onMatchRef.current = onMatch;
  }, [onMatch]);

  useEffect(() => {
    codesRef.current = normalizeCodes(codes);
  }, [codes]);

  useEffect(() => {
    if (!enabled) return;

    const clearIdleTimer = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const resetBuffer = () => {
      bufferRef.current = "";
      clearIdleTimer();
    };

    const scheduleIdleReset = () => {
      clearIdleTimer();
      idleTimerRef.current = setTimeout(resetBuffer, BUFFER_IDLE_RESET_MS);
    };

    const ingest = (raw: string) => {
      const chunk = normalizeInput(raw);
      if (!chunk) return;

      bufferRef.current = `${bufferRef.current}${chunk}`.slice(-64);
      scheduleIdleReset();

      const matched = findMatch(bufferRef.current, codesRef.current);
      if (!matched) return;

      resetBuffer();
      onMatchRef.current(matched);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isEditableTarget(event.target)) return;
      if (event.key.length !== 1) return;

      const char = event.key.toLowerCase();
      if (!/[a-z0-9]/.test(char)) {
        resetBuffer();
        return;
      }

      ingest(char);
    };

    const onPaste = (event: ClipboardEvent) => {
      if (isEditableTarget(event.target)) return;

      const pasted = event.clipboardData?.getData("text") ?? "";
      ingest(pasted);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("paste", onPaste);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("paste", onPaste);
      clearIdleTimer();
    };
  }, [enabled]);
}
