import { useRef } from "react";
import { SECRET_TAP_COUNT, SECRET_TAP_WINDOW_MS } from "../constants";
import styles from "../styles/cheat-pad.module.css";

type CheatHotspotProps = {
  onUnlock: () => void;
};

export default function CheatHotspot({ onUnlock }: CheatHotspotProps) {
  const tapsRef = useRef<number[]>([]);

  const handleTap = () => {
    const now = Date.now();
    tapsRef.current = [...tapsRef.current.filter((t) => now - t < SECRET_TAP_WINDOW_MS), now];

    if (tapsRef.current.length < SECRET_TAP_COUNT) return;

    tapsRef.current = [];
    onUnlock();
  };

  return (
    <button
      type="button"
      className={styles.hotspot}
      aria-label="Cheat zone"
      data-cheat-ignore="true"
      onClick={handleTap}
    />
  );
}
