/**
 * copyright-bar.tsx
 * Barre de copyright commune à toutes les versions du footer
 */

import { cn } from "@/lib/utils";

import styles from "./styles.module.css";

interface CopyrightBarProps {
  year: number;
}

export default function CopyrightBar({ year }: CopyrightBarProps) {
  return (
    <div className={styles.copyrightBar}>
      <p className={cn(styles.small, styles.copyrightText)}>
        © {year} Éducateur Péï. Tous droits réservés.
      </p>
    </div>
  );
}