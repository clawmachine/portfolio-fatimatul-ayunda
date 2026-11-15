import type { ButtonHTMLAttributes, ReactNode } from 'react';
import s from './Button.module.css';

type Common = {
  children: ReactNode;
  /** dark = tombol utama hitam, light = putih dengan shadow halus */
  variant?: 'dark' | 'light';
  /** md = tombol hero (15px), sm = tombol nav (14px) */
  size?: 'md' | 'sm';
  /** lingkaran hitam dengan segitiga play di depan label (tombol Download CV) */
  play?: boolean;
  className?: string;
};

type AsLink = Common & { href: string; target?: string; rel?: string; download?: boolean };
type AsButton = Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>;

export default function Button(props: AsLink | AsButton) {
  const { children, variant = 'dark', size = 'md', play, className } = props;
  const cls = [s.btn, s[variant], s[size], className].filter(Boolean).join(' ');
  const content = (
    <>
      {play && <span className={s.play} aria-hidden="true" />}
      {children}
    </>
  );

  if (props.href !== undefined) {
    const { href, target, rel, download } = props;
    return (
      <a className={cls} href={href} target={target} rel={rel} download={download}>
        {content}
      </a>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children: _c, variant: _v, size: _s, play: _p, className: _cl, href: _h, type = 'button', ...rest } = props;
  return (
    <button className={cls} type={type} {...rest}>
      {content}
    </button>
  );
}
