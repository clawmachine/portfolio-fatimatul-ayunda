'use client';

import { useState, type FormEvent } from 'react';
import { contact } from '@/data/contact';
import s from './ContactForm.module.css';

const copy = contact.form;

/**
 * Form kaca Contact. Tanpa backend: saat dikirim, aplikasi email pengunjung terbuka
 * (mailto:) dengan subjek dan isi pesan yang sudah terisi.
 */
export default function ContactForm({ className }: { className?: string }) {
  const [opened, setOpened] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const topic = String(data.get('topic') ?? '');
    const message = String(data.get('message') ?? '').trim();

    const subject = copy.subject(topic, name);
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${copy.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <form className={className ? `${s.form} ${className}` : s.form} onSubmit={onSubmit} aria-label="Contact form">
      <div className={s.row}>
        <label>
          <span className="srOnly">{copy.name}</span>
          <input className={s.field} name="name" autoComplete="name" placeholder={copy.name} required />
        </label>
        <label>
          <span className="srOnly">{copy.email}</span>
          <input className={s.field} name="email" type="email" autoComplete="email" placeholder={copy.email} required />
        </label>
      </div>

      <label className={s.select}>
        <span className="srOnly">{copy.topicLabel}</span>
        <select className={s.field} name="topic" defaultValue="" required>
          <option value="" disabled>
            {copy.topicPlaceholder}
          </option>
          {copy.topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <span className={s.chevron} aria-hidden="true">
          ⌄
        </span>
      </label>

      <label>
        <span className="srOnly">{copy.message}</span>
        <textarea className={`${s.field} ${s.message}`} name="message" placeholder={copy.message} required />
      </label>

      {/* data-magnetic: tombol mengikuti kursor sedikit (lihat useContactMotion) */}
      <button className={s.submit} type="submit" data-magnetic>
        <span>{copy.submit}</span>
      </button>

      <p className={s.note} aria-live="polite">
        {opened ? copy.opened : ''}
      </p>
    </form>
  );
}
