import { Fragment } from 'react';
import { footer } from '@/data/site';
import s from './Footer.module.css';

/** Footer: hak cipta, keterangan teknologi, tautan (mockup: footer di dasar section .contact). */
export default function Footer() {
  return (
    <footer className={s.footer}>
      <span>{footer.copyright}</span>
      <span>{footer.built}</span>
      <nav aria-label="Footer">
        {footer.links.map((l, i) => {
          const external = l.href.startsWith('http');
          return (
            <Fragment key={l.label}>
              {i > 0 && ' · '}
              <a href={l.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {l.label}
              </a>
            </Fragment>
          );
        })}
      </nav>
    </footer>
  );
}
