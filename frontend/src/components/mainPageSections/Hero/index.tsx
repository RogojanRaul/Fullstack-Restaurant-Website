'use client';
import { useRef, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { AiOutlineTrademark } from 'react-icons/ai';

import ScrollAnimatedIcon from '@/components/ScrollAnimatedIcon';
import useIsMobile from '@/hooks/useIsMobile';

import styles from './styles.module.css';
import Image from 'next/image';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundImgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIconRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<any>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline();

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top+=200 top',
          end: 'bottom',
          toggleActions: 'play none play reverse',
          preventOverlaps: true,
          scrub: 1,
        },
      });

      const tlLogo = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=500',
          toggleActions: 'play none play reverse',
          preventOverlaps: true,
          scrub: true,
        },
      });

      tl.set([scrollIconRef.current, logoRef.current, titleRef.current], {
        opacity: 0,
      });

      tl.to(
        backgroundImgRef.current,
        { scale: 1, duration: 2, ease: 'ease-out' },
        '<'
      )
        .to(scrollIconRef.current, { opacity: 1, duration: 2 }, '<')
        .to(logoRef.current, { opacity: 1, duration: 2 }, '<')
        .to(titleRef.current, { opacity: 1, duration: 2 }, '-=1');

      tl2.to(backgroundImgRef.current, { filter: 'blur(30px)' });

      tlLogo.to(logoRef.current, {
        top: '67px',
        width: '80px',
      });
    });

    return () => {
      context.revert();
    };
  }, [isMobile]);

  return (
    <main ref={containerRef} className={styles.heroContainer}>
      <div className={styles.overlay} ref={overlayRef} />
      <Image
        className={styles.backgroundImg}
        fill
        src='/imgs/new_hero.jpg'
        alt='background image'
        ref={backgroundImgRef}
      />
      <div className={styles.content}>
        <img
          src='aroma-logo-white.svg'
          alt='select logo'
          className={styles.logo}
          ref={logoRef}
        />

        <div ref={titleRef} className={styles.titleContainer}>
          <h1 className={styles.title}>
            BEYOND THE BITE{' '}
            <span className={styles.icon}>
              <AiOutlineTrademark size={isMobile ? 30 : 40} />
            </span>
          </h1>
          <p className={styles.description}>
            Experience the art of fine dining in an elegant, inviting
            atmosphere, where every dish is crafted with passion and tells a
            story of exquisite flavors.
          </p>
        </div>
      </div>
      <div ref={scrollIconRef} className={styles.scrollAnimatedIcon}>
        <ScrollAnimatedIcon />
      </div>
    </main>
  );
};

export default Hero;
