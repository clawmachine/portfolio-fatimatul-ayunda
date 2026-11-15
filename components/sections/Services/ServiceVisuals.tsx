import type { CSSProperties, ReactNode } from 'react';
import { services, type ServiceTag } from '@/data/services';
import Tag from '@/components/ui/Tag/Tag';
import s from './Services.module.css';

/*
 * Ilustrasi UI tiruan di area visual tiap kartu Services.
 * Koordinat disalin dari mockup (px di dalam kanvas selebar kartu pada 1440px);
 * kanvas diskalakan proporsional mengikuti lebar kartu (lihat .canvas di CSS).
 */

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  /** warna blok: soft (default), ink, soft2, deco */
  tone?: 'ink' | 'soft2' | 'deco';
  pill?: boolean;
  r?: number;
};

/** blok abu/hitam penanda elemen UI (mockup: .b) */
function Box({ x, y, w, h, tone, pill, r }: BoxProps) {
  const cls = [s.b, tone && s[tone], pill && s.pill].filter(Boolean).join(' ');
  return <i className={cls} style={{ left: x, top: y, width: w, height: h, borderRadius: r }} />;
}

function ServiceLabel({ tag, style }: { tag: ServiceTag; style: CSSProperties }) {
  return <Tag text={tag.text} dot={tag.dot} style={style} data-sv="tag" />;
}

type PosProps = Omit<BoxProps, 'tone' | 'pill' | 'r'> & {
  className: string;
  style?: CSSProperties;
  /** nama elemen untuk animasi GSAP (data-sv) */
  sv?: string;
  children?: ReactNode;
};

function Pos({ x, y, w, h, className, style, sv, children }: PosProps) {
  return (
    <div className={className} style={{ left: x, top: y, width: w, height: h, ...style }} data-sv={sv}>
      {children}
    </div>
  );
}

/** Web development: jendela browser + HP */
export function WebVisual() {
  const d = services.web;
  return (
    <>
      <Pos className={s.mini} x={60} y={44} w={430} h={250} sv="mini">
        <div className={s.bar}>
          <i />
          <i />
          <i />
        </div>
        <Box x={18} y={40} w={200} h={16} tone="ink" />
        <Box x={18} y={66} w={150} h={10} />
        <Box x={18} y={96} w={120} h={30} tone="ink" pill />
        <Box x={250} y={40} w={160} h={190} tone="soft2" r={12} />
        <Box x={18} y={150} w={104} h={80} />
        <Box x={132} y={150} w={104} h={80} />
      </Pos>
      <Pos className={s.phone} x={440} y={90} w={130} h={250} sv="phone">
        <div className={s.screen}>
          <Box x={12} y={22} w={80} h={12} tone="ink" />
          <Box x={12} y={44} w={92} h={90} tone="soft2" />
          <Box x={12} y={144} w={92} h={20} />
          <Box x={12} y={172} w={92} h={20} tone="ink" pill />
        </div>
      </Pos>
      <ServiceLabel tag={d.stack} style={{ left: 24, top: 22 }} />
      <ServiceLabel tag={d.badge} style={{ right: 30, top: 40 }} />
    </>
  );
}

/** UI design to code: frame Figma → panah → potongan kode */
export function DesignVisual() {
  const d = services.design;
  return (
    <>
      <Pos className={s.frame} x={44} y={50} w={200} h={140} sv="frame">
        <i data-sv="handle" className={s.handle} style={{ left: -6, top: -6 }} />
        <i data-sv="handle" className={s.handle} style={{ right: -6, top: -6 }} />
        <i data-sv="handle" className={s.handle} style={{ left: -6, bottom: -6 }} />
        <i data-sv="handle" className={s.handle} style={{ right: -6, bottom: -6 }} />
        <Box x={16} y={18} w={110} h={12} tone="ink" />
        <Box x={16} y={40} w={160} h={8} tone="deco" />
        <Box x={16} y={56} w={130} h={8} tone="deco" />
        <Box x={16} y={88} w={90} h={30} tone="ink" pill />
      </Pos>
      <span className={s.frameLabel}>{d.frameLabel}</span>
      <svg className={s.arrow} width="90" height="60" viewBox="0 0 90 60" aria-hidden="true" data-sv="arrow">
        <path d="M4 6 C 40 6, 60 20, 78 46" strokeDasharray="4 4" />
        <path d="M70 44 L79 48 L80 38" />
      </svg>
      <div className={s.codechip} data-sv="code">
        {d.code.map((line, i) => (
          <div key={i}>
            {line.map((tok, j) => (
              <span key={j} className={tok.c ? s[tok.c] : undefined}>
                {tok.t}
              </span>
            ))}
          </div>
        ))}
      </div>
      <ServiceLabel tag={d.tool} style={{ right: 24, top: 22 }} />
    </>
  );
}

/** Mobile apps: dua HP (Budget, Sign up) */
export function MobileVisual() {
  const d = services.mobile;
  return (
    <>
      <Pos className={`${s.phone} ${s.phoneBlack}`} x={70} y={40} w={140} h={270} sv="phone">
        <div className={s.screen}>
          <span className={s.screenTitle}>{d.screens[0]}</span>
          <i className={s.donut} />
          <Box x={12} y={150} w={116} h={22} />
          <Box x={12} y={180} w={116} h={22} />
          <Box x={12} y={216} w={116} h={22} tone="ink" pill />
        </div>
      </Pos>
      <Pos className={`${s.phone} ${s.phoneBlack}`} x={240} y={70} w={140} h={270} style={{ transform: 'rotate(7deg)' }} sv="phone">
        <div className={s.screen}>
          <span className={s.screenTitle}>{d.screens[1]}</span>
          <Box x={12} y={48} w={116} h={24} />
          <Box x={12} y={80} w={116} h={24} />
          <Box x={12} y={112} w={116} h={24} />
          <Box x={12} y={152} w={116} h={24} tone="ink" pill />
        </div>
      </Pos>
      <ServiceLabel tag={d.tool} style={{ left: 24, top: 22 }} />
    </>
  );
}

/** QA & testing: checklist UAT */
export function QaVisual() {
  return (
    <ul className={s.uat}>
      {services.qa.checks.map((c) => (
        <li key={c.task} data-sv="row">
          <span className={s.ck} aria-hidden="true" data-sv="ck">
            ✓
          </span>
          {c.task}
          <span className={s.project}>{c.project}</span>
          <span className={s.status} data-sv="status">
            {c.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
