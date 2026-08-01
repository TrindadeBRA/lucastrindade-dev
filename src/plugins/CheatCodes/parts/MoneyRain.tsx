import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  DOLLAR_BILL_SRC,
  MONEY_RAIN_COUNT,
  MONEY_RAIN_DURATION_MS,
} from "../constants";
import styles from "../styles/money-rain.module.css";

type MoneyBill = {
  id: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
  sway: number;
  opacity: number;
};

type MoneyRainProps = {
  sessionKey: string | null;
  count?: number;
  durationMs?: number;
  imageSrc?: string;
};

type BillStyle = CSSProperties & {
  "--bill-rotate": string;
  "--bill-sway": string;
};

function createBills(count: number, sessionKey: string): MoneyBill[] {
  return Array.from({ length: count }, (_, index) => {
    const size = 34 + Math.random() * 42;
    return {
      id: `${sessionKey}-${index}`,
      left: Math.random() * 108 - 4,
      delay: Math.random() * 1.35,
      duration: 1.35 + Math.random() * 1.8,
      size,
      rotate: Math.random() * 720 - 360,
      sway: 18 + Math.random() * 42,
      opacity: 0.78 + Math.random() * 0.22,
    };
  });
}

export default function MoneyRain({
  sessionKey,
  count = MONEY_RAIN_COUNT,
  durationMs = MONEY_RAIN_DURATION_MS,
  imageSrc = DOLLAR_BILL_SRC,
}: MoneyRainProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionKey) return;

    setActiveKey(sessionKey);
    const timer = window.setTimeout(() => {
      setActiveKey((current) => (current === sessionKey ? null : current));
    }, durationMs);

    return () => window.clearTimeout(timer);
  }, [sessionKey, durationMs]);

  const bills = useMemo(() => {
    if (!activeKey) return [];
    return createBills(count, activeKey);
  }, [activeKey, count]);

  if (!activeKey || bills.length === 0) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      {bills.map((bill) => {
        const style: BillStyle = {
          left: `${bill.left}%`,
          width: `${bill.size}px`,
          opacity: bill.opacity,
          animationDelay: `${bill.delay}s`,
          animationDuration: `${bill.duration}s`,
          "--bill-rotate": `${bill.rotate}deg`,
          "--bill-sway": `${bill.sway}px`,
        };

        return (
          <img
            key={bill.id}
            src={imageSrc}
            alt=""
            className={styles.bill}
            draggable={false}
            style={style}
          />
        );
      })}
    </div>
  );
}
