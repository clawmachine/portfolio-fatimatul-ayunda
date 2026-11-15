import type { Metadata } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import AuthProvider from '@/components/auth/AuthProvider/AuthProvider';
import { themeInitScript } from '@/lib/theme';
import './globals.css';

const serif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fatimatul Ayunda — Frontend Developer',
  description:
    'Fatimatul Ayunda, a Frontend Developer building dependable, tidy, and easy-to-use web and mobile interfaces.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // suppressHydrationWarning: skrip tema di <head> menambah data-theme sebelum React hidup
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
