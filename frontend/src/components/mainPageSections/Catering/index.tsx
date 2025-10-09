'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import TextBlock from '@/components/TextBlock';
import { routes } from '@/routes';
import { FaRegCalendarAlt } from 'react-icons/fa';

import styles from './styles.module.css';

const Catering = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const tl = useRef<any>(null);

  const duration = 2;

  useGSAP(() => {
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center bottom',
        end: 'bottom',
        toggleActions: 'play none play reverse',
        preventOverlaps: true,
      },
    });

    gsap.set(textRef.current, {
      x: '-100px',
      opacity: 0,
    });
    gsap.set(imgRef.current, {
      x: '100px',
      opacity: 0,
    });

    tl.current
      .to(
        textRef.current,
        {
          x: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: duration,
        },
        '<'
      )
      .to(
        imgRef.current,
        {
          x: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: duration,
        },
        '<'
      );
  }, []);

  return (
    <div ref={containerRef} className={styles.cateringContainer}>
      <div ref={textRef}>
        <TextBlock
          tag='Catering'
          title='CATERING EXPERIENCE FOR EVERYONE'
          description='Wouldn’t you like to give your next event something special? Catering services from Select give you a wide array of options to fit your unique needs. From buffets and sides to full meal service, we offer a range of catering options to meet your needs, and your budget.'
          buttonText='Book You Catering Experience'
          buttonHref={routes.reservation}
          buttonEndIcon={<FaRegCalendarAlt size={25} />}
        />
      </div>
      <img
        ref={imgRef}
        src='/imgs/catering.jpg'
        alt='photo'
        className={styles.photo}
      />
    </div>
  );
};

export default Catering;
