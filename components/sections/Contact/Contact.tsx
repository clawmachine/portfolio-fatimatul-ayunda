'use client';

import { useRef, type CSSProperties } from 'react';
import { contact, type ContactCard } from '@/data/contact';
import Chip from '@/components/ui/Chip/Chip';
import RichTitle from '@/components/ui/RichTitle/RichTitle';
import SideCard from '@/components/ui/SideCard/SideCard';
import ContactForm from './ContactForm';
import { useContactMotion } from './useContactMotion';
import s from './Contact.module.css';

/** Kartu kontak miring. 3 lapis: posisi (link) → gerak (untuk GSAP nanti) → kartu (rotate CSS). */
function Card({ card }: { card: ContactCard }) {
  const pos = { '--x': `${card.x}px`, '--y': `${card.y}px`, '--w': `${card.w}px` } as CSSProperties;
  const inner = (
    <div className={s.cardMotion} data-card-motion data-side={card.x < 720 ? 'left' : 'right'}>
      <SideCard icon={card.icon} title={card.title} text={card.text} rotate={card.rotate} />
    </div>
  );
  if (!card.href) {
    return (
      <div className={s.cardPos} style={pos}>
        {inner}
      </div>
    );
  }
  const external = card.href.startsWith('http');
  return (
    <a
      className={s.cardPos}
      style={pos}
      href={card.href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {inner}
    </a>
  );
}

/** Section Contact: panggung 1440px (seperti Hero) berisi judul, form kaca, dan 4 kartu kontak miring. */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  useContactMotion(sectionRef);

  return (
    <section ref={sectionRef} id="contact" className={s.contact} aria-labelledby="contact-title">
      <div className={s.stage}>
        <svg className={s.ring} viewBox="0 0 1440 1080" aria-hidden="true" data-ring>
          <path d="M300 440 C 250 760, 560 940, 720 940 C 900 940, 1190 760, 1140 440" />
        </svg>

        <div className={s.head}>
          <span data-chip>
            <Chip>{contact.label}</Chip>
          </span>
          <h2 id="contact-title" className={s.title}>
            {contact.headline.map((line, i) => (
              <span key={i} className={s.line}>
                <span data-line>
                  <RichTitle parts={line} />
                </span>
              </span>
            ))}
          </h2>
        </div>

        <ContactForm className={s.formPos} />

        {/* display: contents di desktop (kartu diposisikan terhadap panggung), grid di HP */}
        <div className={s.cards}>
          {contact.cards.map((c) => (
            <Card key={c.title} card={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
