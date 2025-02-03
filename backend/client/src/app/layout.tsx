import type { Metadata } from 'next';
import './globals.css';
import { poppins } from '@/fonts';
import Providers from './Providers';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Personal Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
