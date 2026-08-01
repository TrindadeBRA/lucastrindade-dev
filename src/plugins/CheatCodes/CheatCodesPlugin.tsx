import { useCallback, useEffect, useRef, useState } from "react";
import { defaultCheatCodes } from "./codes";
import {
  DEFAULT_CHEAT_MESSAGE,
  DEFAULT_DURATION_MS,
  DEFAULT_SOUND_SRC,
} from "./constants";
import { useCheatListener } from "./hooks/useCheatListener";
import { useCheatSound } from "./hooks/useCheatSound";
import CheatHotspot from "./parts/CheatHotspot";
import CheatPad from "./parts/CheatPad";
import CheatToast from "./parts/CheatToast";
import MoneyRain from "./parts/MoneyRain";
import type { CheatCodeDefinition, CheatCodesPluginProps, CheatNotification } from "./types";
import { findCheatMatch } from "./utils/matchCheat";

export default function CheatCodesPlugin({
  codes = defaultCheatCodes,
  soundSrc = DEFAULT_SOUND_SRC,
  message = DEFAULT_CHEAT_MESSAGE,
  durationMs = DEFAULT_DURATION_MS,
  enabled = true,
}: CheatCodesPluginProps) {
  const [notification, setNotification] = useState<CheatNotification | null>(null);
  const [moneyRainBurstKey, setMoneyRainBurstKey] = useState<string | null>(null);
  const [padOpen, setPadOpen] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { play } = useCheatSound(soundSrc);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const handleMatch = useCallback(
    (cheat: CheatCodeDefinition) => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

      const sessionId = `${cheat.id}-${Date.now()}`;

      setNotification({
        id: sessionId,
        codeId: cheat.id,
        message,
      });

      void play();
      cheat.onActivate?.();

      if (cheat.effect === "money-rain") {
        setMoneyRainBurstKey(sessionId);
      }

      hideTimerRef.current = setTimeout(() => {
        setNotification(null);
        hideTimerRef.current = null;
      }, durationMs);
    },
    [durationMs, message, play],
  );

  const handlePadSubmit = useCallback(
    (value: string) => {
      const matched = findCheatMatch(value, codes);
      if (!matched) return false;
      handleMatch(matched);
      return true;
    },
    [codes, handleMatch],
  );

  useCheatListener(codes, handleMatch, enabled);

  return (
    <>
      <CheatToast notification={notification} />
      <MoneyRain burstKey={moneyRainBurstKey} />
      {enabled ? (
        <>
          <CheatHotspot onUnlock={() => setPadOpen(true)} />
          <CheatPad
            open={padOpen}
            onClose={() => setPadOpen(false)}
            onSubmit={handlePadSubmit}
          />
        </>
      ) : null}
    </>
  );
}
