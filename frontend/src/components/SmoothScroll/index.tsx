'use client';

import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { ReactNode, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToTop from '@/utils/scrollToTop';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [mounted]);

  useGSAP(() => {
    if (mounted) {
      ScrollTrigger.refresh();
    }

    if (lenisRef.current) {
      lenisRef.current.on('scroll', ScrollTrigger.update);
      ScrollTrigger.refresh();
    }
  }, [mounted]);

  return (
    <>
      <ScrollToTop lenis={lenisRef.current} />
      {children}
    </>
  );
};

export default SmoothScroll;
