import type { CSSProperties, HTMLAttributes } from 'react';
import s from './Tag.module.css';

type Props = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  text: string;
  /** warna titik kecil di depan teks (opsional) */
  dot?: string;
  /** posisi diatur pemakai lewat className/style (Tag sendiri position: absolute) */
  className?: string;
  style?: CSSProperties;
};

/** Label kaca kecil berbentuk pill, mis. "● React Native" (mockup: .tagg). */
export default function Tag({ text, dot, className, style, ...rest }: Props) {
  return (
    <span {...rest} className={className ? `${s.tag} ${className}` : s.tag} style={style}>
      {dot && <b style={{ background: dot }} />}
      {text}
    </span>
  );
}
