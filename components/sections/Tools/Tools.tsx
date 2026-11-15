import { existsSync } from 'node:fs';
import path from 'node:path';
import type { CSSProperties } from 'react';
import { tools, type Tool } from '@/data/tools';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import ToolsMotion from './ToolsMotion';
import s from './Tools.module.css';

/** true jika logo resmi sudah ditaruh di public/logos/ (dicek saat build/render server). */
const hasLogo = (logo: string) => existsSync(path.join(process.cwd(), 'public', logo));

/** posisi tengah di kanvas 1200×720; hanya dipakai di layout orbit (≥900px) */
const at = (x: number, y: number) => ({ '--x': `${x}px`, '--y': `${y}px` }) as CSSProperties;

function ToolTile({ tool, small }: { tool: Tool; small?: boolean }) {
  const logo = hasLogo(tool.logo);
  return (
    <li
      className={small ? `${s.tile} ${s.sm}` : s.tile}
      style={at(tool.x, tool.y)}
      data-tile
      data-ring={small ? 'outer' : 'inner'}
      data-x={tool.x}
      data-y={tool.y}
    >
      <span className={tool.dark ? `${s.ic} ${s.inv}` : s.ic} aria-hidden="true">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element -- SVG kecil statis, tidak perlu next/image
          <img src={tool.logo} alt="" className={s.logo} />
        ) : small ? (
          tool.mono
        ) : (
          <em>{tool.mono}</em>
        )}
      </span>
      <span className={s.name}>{tool.name}</span>
    </li>
  );
}

/** Section Tools & Skills: orbit dua ring berisi 12 tools (mockup: .orbit). */
export default function Tools() {
  const { core, ringLabels } = tools;
  return (
    <section id="tools" className={s.section} aria-labelledby="tools-title">
      <SectionHeading id="tools-title" size="lg" label={tools.label} title={tools.title} lead={tools.lead} leadWidth={560} />

      <ToolsMotion className={s.wrap}>
        <div className={s.orbit}>
          <svg className={s.rings} viewBox="0 0 1200 720" preserveAspectRatio="none" aria-hidden="true" data-rings>
            <ellipse className={s.ringIn} cx="600" cy="360" rx="300" ry="190" />
            <ellipse className={s.ringOut} cx="600" cy="360" rx="540" ry="320" />
          </svg>

          <div className={s.core} data-core>
            <b>{core.value}</b>
            <span>{core.label}</span>
            <small>{core.note}</small>
          </div>

          <span data-ring-label className={`${s.ringLabel} ${s.labelIn}`} style={at(ringLabels.inner.x, ringLabels.inner.y)}>
            {ringLabels.inner.text}
          </span>
          <ul className={`${s.ring} ${s.inner}`} aria-label={`${core.value} ${core.label}`}>
            {tools.inner.map((t) => (
              <ToolTile key={t.name} tool={t} />
            ))}
          </ul>

          <span data-ring-label className={`${s.ringLabel} ${s.labelOut}`} style={at(ringLabels.outer.x, ringLabels.outer.y)}>
            {ringLabels.outer.text}
          </span>
          <ul className={`${s.ring} ${s.outer}`} aria-label={ringLabels.outer.text}>
            {tools.outer.map((t) => (
              <ToolTile key={t.name} tool={t} small />
            ))}
          </ul>
        </div>
      </ToolsMotion>
    </section>
  );
}
