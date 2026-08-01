import { useCallback, useEffect, useRef } from "react";
import { DEFAULT_SOUND_SRC } from "../constants";

export function useCheatSound(soundSrc = DEFAULT_SOUND_SRC) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(soundSrc);
    audio.preload = "auto";
    audio.volume = 0.85;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [soundSrc]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.currentTime = 0;
      await audio.play();
    } catch {
      return;
    }
  }, []);

  return { play };
}
