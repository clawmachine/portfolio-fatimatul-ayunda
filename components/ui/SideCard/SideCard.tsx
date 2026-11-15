import type { CSSProperties, ReactNode } from 'react';
import s from './SideCard.module.css';

type Props = {
  /** isi kotak ikon 34px (mis. ikon SVG atau "✉") */
  icon?: ReactNode;
  /** pengganti kotak ikon, mis. deretan avatar */
  top?: ReactNode;
  title: ReactNode;
  text: ReactNode;
  /** kemiringan dalam derajat, mis. -6 atau 6 */
  rotate?: number;
  className?: string;
  style?: CSSProperties;
};

/** Kartu putih miring di samping hero dan contact (mockup: .side). */
export default function SideCard({ icon, top, title, text, rotate = 0, className, style }: Props) {
  return (
    <div
      className={className ? `${s.side} ${className}` : s.side}
      style={{ ...style, transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      {top ?? (icon !== undefined && <div className={s.ico}>{icon}</div>)}
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}
