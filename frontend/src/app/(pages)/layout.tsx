import type { Metadata } from 'next';
import metadataConst from '@/Constants/metadataConst';

export const metadata: Metadata = {
  title: metadataConst.title,
  description: metadataConst.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
