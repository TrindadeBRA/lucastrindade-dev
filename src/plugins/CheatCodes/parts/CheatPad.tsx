import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "../styles/cheat-pad.module.css";

type CheatPadProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string) => boolean;
};

export default function CheatPad({ open, onClose, onSubmit }: CheatPadProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    setValue("");
    setError(false);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const ok = onSubmit(value);
    if (ok) {
      setValue("");
      setError(false);
      onClose();
      return;
    }
    setError(true);
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Cheat code">
      <button type="button" className={styles.backdrop} aria-label="Fechar" onClick={onClose} />
      <form className={styles.panel} onSubmit={handleSubmit}>
        <p className={styles.label}>Enter cheat</p>
        <input
          ref={inputRef}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError(false);
          }}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          placeholder="moneyyy"
        />
        <div className={styles.actions}>
          <button type="button" className={styles.ghost} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={styles.submit}>
            Activate
          </button>
        </div>
      </form>
    </div>
  );
}
