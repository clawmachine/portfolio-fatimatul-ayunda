'use client';

import { useRef, type ReactNode } from 'react';
import Image from 'next/image';
import { about } from '@/data/about';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import GlassCard from '@/components/ui/GlassCard/GlassCard';
import RichTitle from '@/components/ui/RichTitle/RichTitle';
import { useAboutMotion } from './useAboutMotion';
import s from './About.module.css';

const { years, projects, tools } = about;

/** "2+" → angka yang dihitung (2) + akhiran (+) */
const splitNumber = (v: string) => {
  const m = v.match(/^(\d+)(.*)$/);
  return m ? { n: m[1], rest: m[2] } : { n: '', rest: v };
};

/** angka besar dengan count-up; pembaca layar membaca nilai akhirnya saja */
function CountUp({ value, children }: { value: string; children?: ReactNode }) {
  const { n, rest } = splitNumber(value);
  return (
    <>
      <span aria-hidden="true">
        <span data-count>{n}</span>
        {rest}
        {children}
      </span>
    </>
  );
}

/** Section About: foto + perkenalan, lalu tiga kartu statistik (mockup: .about + .sbento). */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  useAboutMotion(sectionRef);

  return (
    <section ref={sectionRef} id="about" className={s.section} aria-labelledby="about-title">
      <SectionHeading id="about-title" label={about.label} title={about.title} />

      <div className={s.about}>
        <div className={s.portrait} data-portrait>
          <Image
            className={s.photo}
            src="/images/me-bw.png"
            alt={about.photoAlt}
            width={481}
            height={558}
            sizes="(max-width: 899px) 90vw, 520px"
          />
          <GlassCard
            className={s.location}
            icon={about.location.icon}
            iconBg={about.location.iconBg}
            label={about.location.label}
            sub={about.location.sub}
          />
        </div>

        <div>
          <p className={s.statement} data-statement>
            <RichTitle parts={about.statement} words />
          </p>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className={s.lead} data-intro-text>
              {p}
            </p>
          ))}
          <a className={s.link} href={about.link.href} data-intro-text>
            {about.link.label}
          </a>
        </div>
      </div>

      <div className={s.stats} data-stats>
        {/* 1. tahun pengalaman (kartu gelap) */}
        <article className={`${s.card} ${s.years}`} data-stat>
          <span className={s.tag}>
            <i aria-hidden="true" />
            {years.tag}
          </span>
          <p className={s.big}>
            <span className="srOnly">{`${years.value} ${years.unit}`}</span>
            <CountUp value={years.value}>
              <em>{years.unit}</em>
            </CountUp>
          </p>
          <p className={s.cap}>
            {years.caption[0]}
            <br />
            {years.caption[1]}
          </p>
          <div className={s.ytl} aria-hidden="true">
            <div className={s.line}>
              <i className={s.fill} style={{ width: `${years.filled}%` }} data-fill />
              {years.timeline.map((t) => (
                <b key={t.label} className={t.next ? `${s.dot} ${s.dotNext}` : s.dot} style={{ left: `${t.pos}%` }} data-ydot />
              ))}
            </div>
            <div className={s.labels}>
              {years.timeline.map((t) => (
                <span key={t.label} style={{ left: `${t.pos}%` }} data-ylabel>
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* 2. jumlah project + kotak singkatan */}
        <article className={`${s.card} ${s.light}`} data-stat>
          <p className={s.big}>
            <span className="srOnly">{projects.value}</span>
            <CountUp value={projects.value} />
          </p>
          <p className={s.label}>{projects.label}</p>
          <p className={s.sm}>{projects.sub}</p>
          <ul className={s.tiles} aria-label="Projects">
            {projects.tiles.map((t) => (
              <li key={t.abbr} className={t.dark ? `${s.tile} ${s.tileDark}` : s.tile} data-ptile>
                <abbr title={t.name}>{t.abbr}</abbr>
              </li>
            ))}
          </ul>
        </article>

        {/* 3. tools inti + orbit mini */}
        <article className={`${s.card} ${s.light}`} data-stat>
          <p className={s.big}>
            <span className="srOnly">{tools.value}</span>
            <CountUp value={tools.value} />
          </p>
          <p className={s.label}>{tools.label}</p>
          <p className={s.sm}>{tools.sub}</p>
          <div className={s.morb} data-morb>
            <svg viewBox="0 0 200 140" aria-hidden="true">
              <ellipse cx="100" cy="70" rx="82" ry="52" />
            </svg>
            <span className={s.morbCenter} aria-hidden="true" data-morb-center>
              {tools.center}
            </span>
            <ul aria-label="Core tools">
              {tools.orbit.map((t) => (
                <li
                  key={t.abbr}
                  className={t.dark ? `${s.orb} ${s.orbDark}` : s.orb}
                  style={{ left: t.x, top: t.y }}
                  data-orb
                  data-x={t.x}
                  data-y={t.y}
                >
                  <abbr title={t.name}>{t.abbr}</abbr>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
