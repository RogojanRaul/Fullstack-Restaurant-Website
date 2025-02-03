import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { roboto, barlow, lora } from '@/fonts';
import metadataConst from '@/Constants/metadataConst';

import './globals.css';

export const metadata: Metadata = {
  title: metadataConst.title,
  description: metadataConst.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${roboto.variable} ${lora.variable} ${barlow.variable}`}
      >
        <SmoothScroll>
          <NavBar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
