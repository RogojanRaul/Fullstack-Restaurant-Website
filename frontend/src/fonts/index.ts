import { Barlow, Roboto, Lora } from 'next/font/google';

export const roboto = Roboto({
  subsets: ['latin'],
  variable: '--primary-font',
  weight: ['100', '300', '400', '500', '700', '900'],
  preload: true,
  fallback: ['sans-serif'],
});

export const lora = Lora({
  subsets: ['latin'],
  variable: '--secondary-font',
  weight: ['400', '500', '600', '700'],
  preload: true,
  fallback: ['sans-serif'],
});

export const barlow = Barlow({
  subsets: ['latin'],
  variable: '--ternary-font',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
  fallback: ['sans-serif'],
});
