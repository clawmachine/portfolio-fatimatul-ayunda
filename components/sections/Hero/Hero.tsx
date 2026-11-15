'use client';

import { useRef, type ReactNode } from 'react';
import Image from 'next/image';
import { hero } from '@/data/hero';
import { authCopy } from '@/data/auth';
import { useAuth } from '@/components/auth/AuthProvider/AuthProvider';
import WelcomeCard from '@/components/auth/WelcomeCard/WelcomeCard';
import Button from '@/components/ui/Button/Button';
import GlassCard from '@/components/ui/GlassCard/GlassCard';
import SideCard from '@/components/ui/SideCard/SideCard';
import RichTitle from '@/components/ui/RichTitle/RichTitle';
import { useHeroMotion } from './useHeroMotion';
import s from './Hero.module.css';

function Avatars({ items, plus, className }: { items: { text: string; bg: string }[]; plus?: boolean; className?: string }) {
  return (
    <div className={className ? `${s.av} ${className}` : s.av} aria-hidden="true">
      {items.map((a) => (
        <b key={a.text} style={{ background: a.bg }}>
          {a.text}
        </b>
      ))}
      {plus && <b className={s.plus}>+</b>}
    </div>
  );
}

function Spark({ size, className }: { size: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 0C10.6 7 13 9.4 20 10 13 10.6 10.6 13 10 20 9.4 13 7 10.6 0 10 7 9.4 9.4 7 10 0Z" fill="currentColor" />
    </svg>
  );
}

/**
 * Elemen melayang. Tiga lapis supaya transform tidak saling menimpa:
 * - layer  : posisi absolut dari mockup + parallax mouse & scroll-out (GSAP)
 * - motion : intro & float (GSAP)
 * - anak   : kartu dengan transform CSS-nya sendiri (perspective/rotate), tidak disentuh GSAP
 */
function Float({ pos, depth, hideMobile, children }: { pos: string; depth: number; hideMobile?: boolean; children: ReactNode }) {
  return (
    <div className={`${s.layer} ${pos} ${hideMobile ? s.desktopOnly : ''}`} data-layer data-depth={depth}>
      <div className={s.motion} data-motion data-reveal>
        {children}
      </div>
    </div>
  );
}

/**
 * Hero (mockup: section.hero). Desktop memakai koordinat absolut mockup di panggung 1440×1120
 * yang diskalakan proporsional; di bawah 900px tersusun satu kolom. Animasi: ./useHeroMotion.ts
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroMotion(sectionRef);
  const { user, status, openLogin } = useAuth();
  const { glass, sideLeft, sideRight, clients } = hero;

  return (
    <section ref={sectionRef} className={s.hero} aria-labelledby="hero-title" data-intro="pending">
      <div className={s.stage}>
        <h1 id="hero-title" className={s.title}>
          {hero.headline.map((line, i) => (
            <span key={i} className={s.line}>
              <span data-line data-reveal>
                <RichTitle parts={line} />
              </span>
            </span>
          ))}
        </h1>

        <p className={s.sub} data-sub data-reveal>
          {hero.sub.map((t, i) => (
            <span key={i}>
              {i > 0 && <br className={s.br} />}
              {i > 0 && ' '}
              {t}
            </span>
          ))}
        </p>

        <div className={s.btns} data-btns>
          <span className={s.btnWrap} data-btn data-reveal>
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
          </span>
          <span className={s.btnWrap} data-btn data-reveal>
            <Button href={hero.secondary.href} variant="light" play target="_blank" rel="noopener noreferrer">
              {hero.secondary.label}
            </Button>
          </span>
          {/* Login (CLAUDE.md bagian 7): tombol → kartu "Welcome back" setelah login */}
          {status === 'authed' && user ? (
            <WelcomeCard user={user} />
          ) : (
            <span className={s.btnWrap} data-btn data-reveal>
              <Button variant="light" onClick={() => openLogin()}>
                {authCopy.heroLogin}
              </Button>
            </span>
          )}
        </div>

        {/* ---------- visual: foto + kartu di sekelilingnya ---------- */}
        <div className={s.visual}>
          <svg className={s.ring} viewBox="0 0 1440 1120" aria-hidden="true" data-ring data-reveal>
            <path d="M300 470 C 260 760, 560 900, 720 900 C 900 900, 1180 780, 1170 560" />
          </svg>

          <Float pos={s.ghost1Pos} depth={0.35} hideMobile>
            <div className={`${s.ghost} ${s.ghost1}`} />
          </Float>
          <Float pos={s.ghost2Pos} depth={0.35} hideMobile>
            <div className={`${s.ghost} ${s.ghost2}`} />
          </Float>
          <Float pos={s.ghost3Pos} depth={0.25} hideMobile>
            <div className={`${s.ghost} ${s.ghost3}`} />
          </Float>

          <Image
            className={s.photo}
            src="/images/me-bw.png"
            alt={hero.photoAlt}
            width={481}
            height={558}
            sizes="(max-width: 899px) 310px, 470px"
            preload
            data-photo
            data-reveal
          />

          <Float pos={s.webPos} depth={1.3}>
            <GlassCard className={`${s.glassCard} ${s.web}`} {...glass.web} />
          </Float>
          <Float pos={s.codePos} depth={1.1} hideMobile>
            <div className={`${s.pane} ${s.code}`} aria-hidden="true">
              <pre>
                {hero.code.map((line, i) => (
                  <span key={i} className={s.codeLine}>
                    {line.map((tok, j) => (
                      <span key={j} className={tok.c ? s[tok.c] : undefined}>
                        {tok.t}
                      </span>
                    ))}
                  </span>
                ))}
              </pre>
            </div>
          </Float>
          <Float pos={s.qaPos} depth={1}>
            <GlassCard className={`${s.glassCard} ${s.qa}`} {...glass.qa} />
          </Float>
          <Float pos={s.mobilePos} depth={1.3}>
            <GlassCard className={`${s.glassCard} ${s.mobile}`} {...glass.mobile} />
          </Float>
          <Float pos={s.ballPos} depth={0.9} hideMobile>
            <div className={`${s.pane} ${s.ball}`} aria-hidden="true" />
          </Float>

          <Float pos={s.sideLeftPos} depth={0.6} hideMobile>
            <SideCard
              rotate={-6}
              icon={
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M5 4 1 8l4 4M11 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                </svg>
              }
              title={sideLeft.title.map((t, i) => (
                <span key={t}>
                  {i > 0 && <br />}
                  {t}
                </span>
              ))}
              text={sideLeft.text}
            />
          </Float>
          <Float pos={s.sideRightPos} depth={0.6} hideMobile>
            <SideCard
              rotate={6}
              top={<Avatars items={sideRight.avatars} plus />}
              title={
                <>
                  <em className={s.sideEm}>{sideRight.titleItalic}</em>
                  <br />
                  {sideRight.title}
                </>
              }
              text={sideRight.text}
            />
          </Float>

          <svg className={s.badge} viewBox="0 0 130 130" aria-hidden="true" data-badge data-reveal>
            <defs>
              <path id="hero-badge-path" d="M65,65 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0" />
            </defs>
            <g data-spin>
              <text>
                <textPath href="#hero-badge-path">{hero.badge}</textPath>
              </text>
            </g>
            <path d="M65 51 C66 61 69 64 79 65 C69 66 66 69 65 79 C64 69 61 66 51 65 C61 64 64 61 65 51Z" />
          </svg>
        </div>

        {/* ---------- pojok bawah ---------- */}
        <div className={s.corners}>
          <div className={s.clients} data-corner data-reveal>
            <div className={s.rule} />
            <p className={s.note}>
              {clients.text.map((t, i) => (
                <span key={t}>
                  {i > 0 && <br />}
                  {t}
                </span>
              ))}
            </p>
            <Avatars items={clients.avatars} className={s.clientAv} />
          </div>

          <div className={s.stats} data-corner data-reveal>
            <div className={`${s.rule} ${s.ruleStats}`} />
            <div>
              <Spark size={20} className={s.spark} />
              <p className={s.note}>
                {hero.stats.map((t, i) => (
                  <span key={t}>
                    {i > 0 && <br />}
                    {t}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
