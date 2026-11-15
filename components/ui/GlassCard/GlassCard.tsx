import type { CSSProperties } from 'react';
import s from './GlassCard.module.css';

export type GlassCardProps = {
  icon: string;
  /** warna kotak ikon, mis. var(--accent-green) */
  iconBg: string;
  iconColor?: string;
  label: string;
  sub?: string;
  className?: string;
  style?: CSSProperties;
};

/** Kartu kaca kecil: kotak ikon berwarna + label + subteks (mockup: .glass). */
export default function GlassCard({ icon, iconBg, iconColor = '#fff', label, sub, className, style }: GlassCardProps) {
  return (
    <div className={className ? `${s.glass} ${className}` : s.glass} style={style}>
      <div className={s.title}>
        <i style={{ background: iconBg, color: iconColor }} aria-hidden="true">
          {icon}
        </i>
        {label}
      </div>
      {sub && <small>{sub}</small>}
    </div>
  );
}
