'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { AiOutlineTrademark } from 'react-icons/ai';
import ScrollAnimatedIcon from '@/components/ScrollAnimatedIcon';

import useIsMobile from '@/hooks/useIsMobile';

import styles from './styles.module.css';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const backgroundImgRef = useRef<HTMLImageElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrollIconRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<any | null>(null);
  const tl2 = useRef<any | null>(null);
  const tlLogo = useRef<any | null>(null);

  const isMobile = useIsMobile();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    tl.current = gsap.timeline();
    tl2.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top+=200 top',
        end: 'bottom',
        toggleActions: 'play none play reverse',
        preventOverlaps: true,
        scrub: 1,
      },
    });
    tlLogo.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'clamp(top top)',
        end: 'clamp(+=500)',
        toggleActions: 'play none play reverse',
        preventOverlaps: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl.current
      .to(overlayRef.current, { opacity: 0, duration: 2, ease: 'power1.out' })
      .to(
        backgroundImgRef.current,
        {
          scale: 1,
          duration: 2,
          ease: 'ease-out',
        },
        '<'
      )
      .to(scrollIconRef.current, { opacity: 1, duration: 2 }, '<')
      .to(logoRef.current, { opacity: 1, duration: 2 }, '<')
      .to(titleRef.current, { opacity: 1, duration: 2 }, '-=1');

    tl2.current
      .to(backgroundImgRef.current, {
        filter: 'blur(30px)',
      })
      .to(
        titleRef.current,
        {
          filter: 'blur(30px)',
          opacity: 0,
        },
        '<'
      );

    tlLogo.current.to(logoRef.current, {
      top: '30px',
      left: isMobile ? '100px' : '50%',
      width: '45px',
      transform: 'translate(-50%, 0)',
    });
  }, [isMobile]);

  return (
    <main ref={containerRef} className={styles.heroContainer}>
      <div className={styles.overlay} ref={overlayRef} />
      <img
        className={styles.backgroundImg}
        src='/imgs/hero_2.jpg'
        alt='background image'
        ref={backgroundImgRef}
      />
      <div className={styles.content}>
        <div ref={logoRef} className={styles.logo}>
          <img src='select-logo.svg' alt='select logo' />
        </div>
        <div ref={titleRef} className={styles.titleContainer}>
          <h1 className={styles.title}>
            DINE DIFFERENT{' '}
            <span className={styles.icon}>
              <AiOutlineTrademark size={isMobile ? 30 : 40} />
            </span>
          </h1>
        </div>
      </div>
      <div ref={scrollIconRef} className={styles.scrollAnimatedIcon}>
        <ScrollAnimatedIcon />
      </div>
    </main>
  );
};

export default Hero;
