'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { routes } from '@/routes';
import { MdRestaurantMenu } from 'react-icons/md';
import TextBlock from '@/components/TextBlock';

import styles from './styles.module.css';
import useIsMobile from '@/hooks/useIsMobile';

const About = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const img2Ref = useRef<HTMLImageElement | null>(null);
  const img3Ref = useRef<HTMLImageElement | null>(null);
  const img4Ref = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<any>(null);

  const animationDuration = 2;

  const isMobile = useIsMobile();

  useGSAP(() => {
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: isMobile ? 'center center' : 'bottom-=200',
        toggleActions: 'play none play reverse',
        preventOverlaps: true,
        scrub: 1,
      },
    });

    gsap.set(imgRef.current, {
      x: '-250px',
      opacity: 0,
      rotate: '30deg',
    });
    gsap.set(img2Ref.current, {
      x: '100px',
      opacity: 0,
      rotate: '60deg',
    });
    gsap.set(img3Ref.current, {
      x: '-100px',
      opacity: 0,
      rotate: '-20deg',
    });
    gsap.set(img4Ref.current, {
      opacity: 0,
    });
    gsap.set(textRef.current, {
      x: '50px',
      opacity: 0,
    });

    tl.current
      .to(imgRef.current, {
        x: 0,
        opacity: 1,
        rotate: 0,
        duration: animationDuration,
        ease: 'power3.out',
      })
      .to(
        img2Ref.current,
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: animationDuration,
          ease: 'power3.out',
        },
        '<'
      )
      .to(
        img3Ref.current,
        {
          x: 0,
          opacity: 1,
          rotate: '20deg',
          duration: animationDuration,
          ease: 'power3.out',
        },
        '<'
      )
      .to(
        img4Ref.current,
        {
          opacity: 1,
          duration: animationDuration,
          ease: 'power3.out',
        },
        '<'
      )
      .to(
        textRef.current,
        {
          x: 0,
          opacity: 1,
          duration: animationDuration,
          ease: 'power3.out',
        },
        '<'
      );
  }, [isMobile]);

  return (
    <div ref={containerRef} className={styles.aboutContainer}>
      <img
        ref={img4Ref}
        src='/imgs/catering-2.jpg'
        alt='background image'
        className={styles.bgImg}
      />
      <img
        ref={img2Ref}
        src='/imgs/plate-2-img.png'
        alt='background image'
        className={styles.plate2}
      />
      <img
        ref={img3Ref}
        src='/imgs/glass-img.png'
        alt='background image'
        className={styles.glass}
      />
      <div className={styles.imgContainer}>
        <img
          ref={imgRef}
          src='/imgs/plate-img.png'
          alt='A image with a plate of food'
        />
      </div>
      <div ref={textRef}>
        <TextBlock
          tag='About us'
          title='TASTE ISN’T LIMITED TO THE PLATE.'
          description='Discover the flavors that make us unforgettable! Explore our menu filled with fresh ingredients and mouthwatering dishes crafted to perfection. Click below to dive into a culinary adventure today!'
          buttonText='See Our Menu'
          buttonHref={routes.menu}
          buttonEndIcon={<MdRestaurantMenu size={25} />}
        />
      </div>
    </div>
  );
};

export default About;
