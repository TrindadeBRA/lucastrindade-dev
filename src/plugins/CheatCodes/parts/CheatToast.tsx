import styles from "../styles/cheat-codes.module.css";
import type { CheatNotification } from "../types";

type CheatToastProps = {
  notification: CheatNotification | null;
};

export default function CheatToast({ notification }: CheatToastProps) {
  return (
    <div className={styles.root} role="status" aria-live="polite">
      {notification ? (
        <div key={notification.id} className={styles.toast}>
          <span className={styles.text}>{notification.message}</span>
        </div>
      ) : null}
    </div>
  );
}
