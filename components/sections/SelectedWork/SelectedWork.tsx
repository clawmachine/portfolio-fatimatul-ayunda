'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { projects } from '@/data/projects';
import RichTitle from '@/components/ui/RichTitle/RichTitle';
import ProjectMock from './ProjectMock';
import { CaseStudyButton, LockInfo } from './CaseStudy';
import s from './SelectedWork.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);
  const total = projects.length;

  useGSAP(
    () => {
      ScrollTrigger.config({ ignoreMobileResize: true });
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current!;
        const cards = gsap.utils.toArray<HTMLElement>('[data-card]', track);
        const distance = () => track.scrollWidth - window.innerWidth;
        let current = -1;

        const setActive = (idx: number) => {
          if (idx === current) return;
          current = idx;
          gsap.to([numRef.current, nameRef.current], {
            yPercent: -(100 / total) * idx,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: true,
          });
          if (liveRef.current) liveRef.current.textContent = `Project ${idx + 1} of ${total}`;
        };

        // Scroll vertikal menggerakkan track ke kiri, jadi kartu terasa bergeser ke kanan.
        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => '+=' + distance(),
            pin: stageRef.current,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(barRef.current, { scaleX: self.progress });
              setActive(Math.min(total - 1, Math.round(self.progress * (total - 0.4))));
            },
          },
        });
        setActive(0);

        // Kedalaman di dalam setiap kartu selama kartu melintasi layar.
        cards.forEach((card) => {
          const inner = card.querySelector('[data-inner]');
          const badge = card.querySelector('[data-badge]');
          const across = { trigger: card, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true };

          gsap.fromTo(inner, { xPercent: 7 }, { xPercent: -7, ease: 'none', scrollTrigger: across });
          gsap.fromTo(badge, { xPercent: 40 }, { xPercent: -40, ease: 'none', scrollTrigger: { ...across } });
          gsap.fromTo(
            card,
            { scale: 0.9, rotate: 2 },
            {
              scale: 1,
              rotate: 0,
              ease: 'power2.out',
              scrollTrigger: { trigger: card, containerAnimation: slide, start: 'left 105%', end: 'left 55%', scrub: true },
            },
          );
        });

        gsap.from('[data-head] > *', {
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="work" className={s.section} aria-labelledby="work-title">
      <div ref={stageRef} className={s.stage}>
        <div className={s.top}>
          <div className={s.head} data-head>
            <h2 id="work-title">
              Selected <em>work.</em>
            </h2>
            <p>Eight apps across banking, e-learning, employee benefits, gaming, and education.</p>
            <LockInfo />
          </div>

          <div className={s.meter} aria-hidden="true">
            <div className={s.counter}>
              <span className={s.num}>
                <span ref={numRef} className={s.numTrack}>
                  {projects.map((_, i) => <b key={i}>{pad(i + 1)}</b>)}
                </span>
              </span>
              <span className={s.total}>/ {pad(total)}</span>
            </div>
            <div className={s.names}>
              <div ref={nameRef} className={s.namesTrack}>
                {projects.map((p) => <div key={p.id}><RichTitle parts={p.short} /></div>)}
              </div>
            </div>
            <div className={s.progress}><i ref={barRef} /></div>
          </div>
          <span ref={liveRef} className={s.srOnly} aria-live="polite" />
        </div>

        <div ref={trackRef} className={s.track}>
          {projects.map((p, i) => (
            <article key={p.id} className={s.card} data-card>
              <div className={`${s.vis} ${p.dark ? s.visDark : ''}`}>
                <span className={s.no}>{pad(i + 1)}</span>
                <div className={s.inner} data-inner>
                  {p.image ? (
                    <Image src={p.image} alt={`Screenshot ${p.title.map((t) => t.text).join('')}`} fill sizes="560px" style={{ objectFit: 'cover' }} />
                  ) : (
                    <ProjectMock kind={p.mock} />
                  )}
                </div>
                <div className={s.badge} data-badge style={p.badge.side === 'left' ? { left: '7%' } : { right: '7%' }}>
                  <div className={s.badgeTitle}>
                    <i style={{ background: p.badge.color, color: p.badge.iconColor ?? '#fff' }}>{p.badge.icon}</i>
                    {p.badge.label}
                  </div>
                  <small>{p.badge.sub}</small>
                </div>
              </div>

              <div className={s.info}>
                <div className={s.meta}>
                  <span>{p.org}</span>
                  <span>{p.year}</span>
                </div>
                <h3><RichTitle parts={p.title} /></h3>
                <p>{p.description}</p>
                <ul>{p.contributions.map((c) => <li key={c}>{c}</li>)}</ul>
                <div className={s.pills}>{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
                <CaseStudyButton project={p} />
              </div>
            </article>
          ))}

          <div className={s.endCard}>
            <h3>That’s <em>all eight.</em></h3>
            <p>Keep scrolling to see my experience and education.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
