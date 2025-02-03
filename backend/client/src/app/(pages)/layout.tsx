import type { Metadata } from 'next';
import { poppins } from '@/fonts';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Personal Portfolio',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
