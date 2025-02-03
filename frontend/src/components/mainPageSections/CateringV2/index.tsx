'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

import { routes } from '@/routes';
import { FaRegCalendarAlt } from 'react-icons/fa';

import styles from './styles.module.css';
import Button from '../../Button';
import DineDifferent from '../../DineDifferent';

const CateringV2 = () => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLImageElement>(null);
  const cardLeftRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLImageElement>(null);
  const tl = useRef<any>(null);

  useGSAP(() => {
    if (!cardRightRef.current || !cardLeftRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set('#cards', { opacity: 0 });
    gsap.set(cardLeftRef.current, { x: -100 });
    gsap.set(cardRightRef.current, { x: 100 });
    gsap.set(headingRef.current, { opacity: 0, transform: 'scale(0.9)' });

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center+=100',
        end: 'bottom bottom-=200',
        toggleActions: 'play none play reverse',
        preventOverlaps: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl.current
      .to('#cards', { opacity: 1 })
      .to(cardLeftRef.current, { x: 0, transform: 'rotateY(20deg)' }, '<')
      .to(cardRightRef.current, { x: 0, transform: 'rotateY(-20deg)' }, '<')
      .to(headingRef.current, { opacity: 1, transform: 'scale(1)' });
  }, []);
  return (
    <div ref={containerRef} className={styles.container}>
      <div ref={cardsContainerRef} className={styles.cardsContainer}>
        <div id='cards' className={`${styles.card} ${styles.cardLeft}`}>
          <div className={styles.imgContainer}>
            <img ref={cardLeftRef} src='./imgs/gallery-img-2.jpg' />
          </div>
        </div>
        <div id='cards' className={`${styles.card}`}>
          <div className={styles.imgContainer}>
            <img src='./imgs/select_1.jpg' />
          </div>
        </div>
        <div id='cards' className={`${styles.card} ${styles.cardRight}`}>
          <div className={styles.imgContainer}>
            <img ref={cardRightRef} src='./imgs/gallery-img-6.jpg' />
          </div>
        </div>
      </div>
      <div ref={headingRef} className={styles.heading}>
        <DineDifferent />
        <h1 className={styles.title}>CATERING EXPERIENCE FOR EVERYONE</h1>
        <p className={styles.description}>
          Wouldn’t you like to give your next event something special? Catering
          services from Select give you a wide array of options to fit your
          unique needs. From buffets and sides to full meal service, we offer a
          range of catering options to meet your needs, and your budget.'
        </p>
        <Button
          variant='primary-secondary'
          as='Link'
          href={routes.reservation}
          size='sm'
          endIcon={<FaRegCalendarAlt />}
        >
          Book Your Catering Experience
        </Button>
      </div>
    </div>
  );
};

export default CateringV2;
