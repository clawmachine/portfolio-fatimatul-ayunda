'use client';

import { useRef, type ReactNode } from 'react';
import type { TitlePart } from '@/data/types';
import { services } from '@/data/services';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import RichTitle from '@/components/ui/RichTitle/RichTitle';
import { DesignVisual, MobileVisual, QaVisual, WebVisual } from './ServiceVisuals';
import { useServicesMotion } from './useServicesMotion';
import s from './Services.module.css';

type CardProps = {
  /** nama kartu, dipakai untuk lebar kanvas ilustrasi di HP */
  id: 'web' | 'design' | 'mobile' | 'qa';
  /** lebar kolom grid 12: 7 atau 5 */
  span: 7 | 5;
  dark?: boolean;
  title: TitlePart[];
  text: string;
  children: ReactNode;
};

function ServiceCard({ id, span, dark, title, text, children }: CardProps) {
  return (
    <article className={[s.card, s[id], span === 7 ? s.w7 : s.w5, dark && s.dark].filter(Boolean).join(' ')} data-service={id}>
      <div className={s.stage}>
        <div className={s.canvas} aria-hidden="true">
          {children}
        </div>
      </div>
      <div className={s.txt}>
        <h3>
          <RichTitle parts={title} />
        </h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

/** Section Services: bento grid empat kartu (mockup: .bento). */
export default function Services() {
  const { web, design, mobile, qa } = services;
  const sectionRef = useRef<HTMLElement>(null);
  useServicesMotion(sectionRef);

  return (
    <section ref={sectionRef} id="services" className={s.section} aria-labelledby="services-title">
      <SectionHeading id="services-title" label={services.label} title={services.title} />
      <div className={s.bento}>
        <ServiceCard id="web" span={7} title={web.title} text={web.text}>
          <WebVisual />
        </ServiceCard>
        <ServiceCard id="design" span={5} title={design.title} text={design.text}>
          <DesignVisual />
        </ServiceCard>
        <ServiceCard id="mobile" span={5} dark title={mobile.title} text={mobile.text}>
          <MobileVisual />
        </ServiceCard>
        <ServiceCard id="qa" span={7} title={qa.title} text={qa.text}>
          <QaVisual />
        </ServiceCard>
      </div>
    </section>
  );
}
