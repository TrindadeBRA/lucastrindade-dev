import { useEffect } from "react";
import styles from "../styles/cheat-trainer.module.css";
import type { CheatCodeDefinition } from "../types";

type CheatTrainerProps = {
  open: boolean;
  codes: CheatCodeDefinition[];
  onClose: () => void;
  onSelect: (cheat: CheatCodeDefinition) => void;
};

export default function CheatTrainer({
  open,
  codes,
  onClose,
  onSelect,
}: CheatTrainerProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Cheat trainer">
      <button type="button" className={styles.backdrop} aria-label="Fechar" onClick={onClose} />
      <div className={styles.panel}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Easter egg desbloqueado</p>
            <h2 className={styles.title}>Menu de Trapaças</h2>
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </header>

        <p className={styles.subtitle}>
          Achou o atalho secreto. Agora escolha sua trapaça favorita. Sem
          download duvidoso, sem vírus, só caos inocente.
        </p>

        <ul className={styles.list}>
          {codes.map((cheat, index) => (
            <li key={cheat.id}>
              <button
                type="button"
                className={styles.item}
                onClick={() => {
                  onSelect(cheat);
                  onClose();
                }}
              >
                <div className={styles.itemTop}>
                  <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.itemLabel}>{cheat.label}</span>
                  <span className={styles.code}>{cheat.code}</span>
                </div>
                <p className={styles.itemDescription}>{cheat.description}</p>
                <span className={styles.activate}>Ativar trapaça</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
