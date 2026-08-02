import { useEffect, useState, type CSSProperties } from "react";
import {
  DOLLAR_BILL_SRC,
  MONEY_RAIN_COUNT,
  MONEY_RAIN_MAX_BILLS,
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
  burstKey: string | null;
  count?: number;
  imageSrc?: string;
};

type BillStyle = CSSProperties & {
  "--bill-rotate": string;
  "--bill-sway": string;
};

function createBills(count: number, burstKey: string): MoneyBill[] {
  return Array.from({ length: count }, (_, index) => {
    const size = 34 + Math.random() * 42;
    return {
      id: `${burstKey}-${index}`,
      left: Math.random() * 110 - 5,
      delay: Math.random() * 0.85,
      duration: 2.4 + Math.random() * 1.6,
      size,
      rotate: Math.random() * 720 - 360,
      sway: 18 + Math.random() * 48,
      opacity: 0.78 + Math.random() * 0.22,
    };
  });
}

export default function MoneyRain({
  burstKey,
  count = MONEY_RAIN_COUNT,
  imageSrc = DOLLAR_BILL_SRC,
}: MoneyRainProps) {
  const [bills, setBills] = useState<MoneyBill[]>([]);

  useEffect(() => {
    if (!burstKey) return;

    setBills((current) => {
      const next = [...current, ...createBills(count, burstKey)];
      if (next.length <= MONEY_RAIN_MAX_BILLS) return next;
      return next.slice(next.length - MONEY_RAIN_MAX_BILLS);
    });
  }, [burstKey, count]);

  const removeBill = (id: string) => {
    setBills((current) => current.filter((bill) => bill.id !== id));
  };

  if (bills.length === 0) return null;

  return (
    <div className={styles.root} aria-hidden="true" data-cheat-ignore="true">
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
            role="presentation"
            aria-hidden="true"
            className={styles.bill}
            draggable={false}
            style={style}
            onAnimationEnd={() => removeBill(bill.id)}
          />
        );
      })}
    </div>
  );
}
