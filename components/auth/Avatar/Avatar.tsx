'use client';

import { useState } from 'react';
import Image from 'next/image';
import { avatarFallback, type User } from '@/lib/auth';
import s from './Avatar.module.css';

/** Foto profil user DummyJSON; jika gagal dimuat, diganti lingkaran berinisial. */
export default function Avatar({ user, size }: { user: User; size: number }) {
  const name = user.firstName || user.username;
  const [failed, setFailed] = useState(false);
  const src = !failed && user.image ? user.image : avatarFallback(name);

  return (
    <Image
      className={s.avatar}
      src={src}
      alt=""
      width={size}
      height={size}
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
      unoptimized={src.startsWith('data:')}
    />
  );
}
