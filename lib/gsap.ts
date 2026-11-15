// Satu-satunya tempat plugin GSAP didaftarkan.
// Komponen mengimpor dari sini: import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
