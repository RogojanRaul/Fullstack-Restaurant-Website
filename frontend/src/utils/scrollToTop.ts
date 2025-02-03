'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface ScrollToTopProps {
  lenis: any;
}

export default function ScrollToTop({ lenis }: ScrollToTopProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}
