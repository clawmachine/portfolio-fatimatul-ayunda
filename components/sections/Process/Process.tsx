'use client';

import { useRef } from 'react';
import { workProcess } from '@/data/process';
import { gsap, useGSAP } from '@/lib/gsap';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import s from './Process.module.css';

/** Section Process: lima langkah kerja berjajar di atas satu garis (mockup: .proc). */
export default function Process() {
  const ref = useRef<HTMLElement>(null);

  /*
   * Animasi (CLAUDE.md bagian 6, prioritas 2): garis atas tumbuh kiri→kanan,
   * lalu langkah 01–05 muncul bergantian (nomor turun, teks naik). Hanya bila motion diizinkan.
   */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: '[data-steps]', start: 'top 80%', once: true },
        });
        tl.from('[data-line]', { scaleX: 0, duration: 1.2, ease: 'power2.inOut' }, 0)
          .from('[data-step-no]', { yPercent: -60, autoAlpha: 0, duration: 0.7, stagger: 0.14 }, 0.2)
          // judul + paragraf satu langkah muncul bersamaan (2 elemen per langkah)
          .from('[data-step-text]', { y: 20, autoAlpha: 0, duration: 0.7, stagger: (i: number) => Math.floor(i / 2) * 0.14 }, 0.3);
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="process" className={s.section} aria-labelledby="process-title">
      <SectionHeading id="process-title" size="sub" label={workProcess.label} title={workProcess.title} />
      <ol className={s.steps} data-steps>
        {/* garis atas elemen sendiri agar bisa "tumbuh" kiri→kanan */}
        <li className={s.line} aria-hidden="true" data-line />
        {workProcess.steps.map((step) => (
          <li key={step.no} className={s.step}>
            <b aria-hidden="true" data-step-no>
              {step.no}
            </b>
            <h4 data-step-text>{step.title}</h4>
            <p data-step-text>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
