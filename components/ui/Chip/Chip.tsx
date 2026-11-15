import type { ReactNode } from 'react';
import s from './Chip.module.css';

/** Pill putih dengan ikon ✦, mis. "✦ About Me". */
export default function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={className ? `${s.chip} ${className}` : s.chip}>{children}</span>;
}
