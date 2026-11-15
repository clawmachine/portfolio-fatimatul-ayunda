'use client';

import { useRef } from 'react';
import { experience, type Job, type School } from '@/data/experience';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import RichTitle from '@/components/ui/RichTitle/RichTitle';
import Tag from '@/components/ui/Tag/Tag';
import { useExperienceMotion } from './useExperienceMotion';
import s from './Experience.module.css';

function JobRow({ job }: { job: Job }) {
  return (
    <li className={s.row} data-row>
      <div className={s.year} data-year>
        <b>{job.year}</b>
        <em>{job.range}</em>
        <small>{job.badge}</small>
      </div>
      <span className={job.highlight ? `${s.dot} ${s.dotOn}` : s.dot} aria-hidden="true" data-dot />
      <article className={s.card} data-card>
        <div className={s.head}>
          <span className={job.monoDark ? `${s.mono} ${s.monoDark}` : s.mono} aria-hidden="true">
            {job.mono}
          </span>
          <p className={s.company}>
            {job.company}
            <small>{job.place}</small>
          </p>
        </div>
        <ul className={s.stack} aria-label="Tools">
          {job.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <h4>
          <RichTitle parts={job.role} />
        </h4>
        <p className={s.text}>{job.text}</p>
        {job.bullets && (
          <ul className={s.bullets}>
            {job.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
        {job.shipped && (
          <div className={s.shipped}>
            {job.shipped.label}
            {job.shipped.clients.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        )}
      </article>
    </li>
  );
}

function Ticket({ item }: { item: School }) {
  return (
    <article className={item.dark ? `${s.ticket} ${s.ticketDark}` : s.ticket} data-ticket>
      <div className={s.top}>
        <Tag text={item.tag} className={s.ticketTag} />
        <b>
          {item.year}
          <br />
          <em>{item.range}</em>
        </b>
      </div>
      <div className={s.perf} aria-hidden="true" />
      <div className={s.bottom}>
        <h4>{item.school}</h4>
        <p className={s.degree}>{item.degree}</p>
        {item.text && <p className={s.note}>{item.text}</p>}
      </div>
    </article>
  );
}

/** Section Experience & Education: timeline kerja, kartu tiket pendidikan, bahasa (mockup: .tl, .edu, .langs). */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  useExperienceMotion(sectionRef);

  return (
    <section ref={sectionRef} id="experience" className={s.section} aria-labelledby="experience-title">
      <SectionHeading id="experience-title" label={experience.label} title={experience.title} />

      <div className={s.timeline} data-timeline>
        {/* garis vertikal elemen sendiri agar bisa tumbuh mengikuti scroll */}
        <span className={s.rail} aria-hidden="true" data-rail />
        <ol className={s.rows}>
          {experience.jobs.map((job) => (
            <JobRow key={job.company} job={job} />
          ))}
        </ol>
      </div>

      <h3 className={s.eduLabel}>{experience.educationLabel}</h3>
      <div className={s.edu} data-edu>
        {experience.education.map((item) => (
          <Ticket key={item.school} item={item} />
        ))}
      </div>

      <div className={s.langs} data-langs>
        {experience.languagesLabel}
        {experience.languages.map((l) => (
          <span key={l.code} lang={l.code}>
            <i aria-hidden="true">{l.code}</i>
            {l.name} <small>{l.level}</small>
          </span>
        ))}
      </div>
    </section>
  );
}
