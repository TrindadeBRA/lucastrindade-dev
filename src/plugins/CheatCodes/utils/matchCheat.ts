import type { CheatCodeDefinition } from "../types";

export function normalizeCheatInput(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function normalizeCheatCodes(codes: CheatCodeDefinition[]) {
  return codes
    .map((entry) => ({
      ...entry,
      code: normalizeCheatInput(entry.code),
    }))
    .filter((entry) => entry.code.length > 0)
    .sort((a, b) => b.code.length - a.code.length);
}

export function findCheatMatch(buffer: string, codes: CheatCodeDefinition[]) {
  const normalizedCodes = normalizeCheatCodes(codes);
  const normalizedBuffer = normalizeCheatInput(buffer);

  return (
    normalizedCodes.find((cheat) => normalizedBuffer.endsWith(cheat.code)) ??
    normalizedCodes.find((cheat) => normalizedBuffer.includes(cheat.code)) ??
    null
  );
}
