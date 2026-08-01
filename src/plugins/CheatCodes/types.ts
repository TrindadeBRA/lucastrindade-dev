export type CheatCodeId = string;

export type CheatEffectId = "money-rain";

export type CheatCodeDefinition = {
  id: CheatCodeId;
  code: string;
  label?: string;
  effect?: CheatEffectId;
  onActivate?: () => void;
};

export type CheatNotification = {
  id: string;
  codeId: CheatCodeId;
  message: string;
};

export type CheatCodesPluginProps = {
  codes?: CheatCodeDefinition[];
  soundSrc?: string;
  message?: string;
  durationMs?: number;
  enabled?: boolean;
};
