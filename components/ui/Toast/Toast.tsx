'use client';

import { useState } from 'react';
import s from './Toast.module.css';

/** Notifikasi kaca kecil di bawah tengah layar. Pesan terakhir tetap dirender saat bergeser keluar. */
export default function Toast({ toast }: { toast: { id: number; message: string } | null }) {
  const [last, setLast] = useState('');
  if (toast && toast.message !== last) setLast(toast.message);

  return (
    <div className={`${s.toast} ${toast ? s.show : ''}`} role="status" aria-live="polite">
      {toast?.message ?? last}
    </div>
  );
}
