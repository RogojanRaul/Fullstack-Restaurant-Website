'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

import { routes } from '@/routes';
import { FaRegCalendarAlt } from 'react-icons/fa';
import Button from '../../Button';
import DineDifferent from '../../DineDifferent';

import styles from './styles.module.css';

const CateringV2 = () => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLImageElement>(null);
  const cardMiddleRef = useRef<HTMLImageElement>(null);
  const cardLeftRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLImageElement>(null);
  const tl = useRef<any>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.set(cardLeftRef.current, { x: -100 });
      gsap.set(cardRightRef.current, { x: 100 });
      gsap.set(cardMiddleRef.current, { scale: 0.8 });
      gsap.set(headingRef.current, { scale: 0.8 });

      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom bottom-=200',
          toggleActions: 'play none play reverse',
          preventOverlaps: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.current
        .to(cardLeftRef.current, { x: 0, rotateY: 20 }, '<')
        .to(cardRightRef.current, { x: 0, rotateY: -20 }, '<')
        .to(cardMiddleRef.current, { scale: 1 }, '<')
        .to(headingRef.current, { scale: 1 });
    });

    return () => context.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div ref={cardsContainerRef} className={styles.cardsContainer}>
        <div id='cards' className={`${styles.card} ${styles.cardLeft}`}>
          <div className={styles.imgContainer}>
            <Image
              ref={cardLeftRef}
              fill
              src='/imgs/cat-1.jpg'
              alt='Gallery Image 2'
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div id='cards' className={`${styles.card}`}>
          <div className={styles.imgContainer}>
            <Image
              ref={cardMiddleRef}
              fill
              src='/imgs/cat-2.jpg'
              alt='Select Image 1'
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div id='cards' className={`${styles.card} ${styles.cardRight}`}>
          <div className={styles.imgContainer}>
            <Image
              ref={cardRightRef}
              fill
              src='/imgs/cat-3.jpg'
              alt='Gallery Image 6'
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
      <div ref={headingRef} className={styles.heading}>
        <h1 className={styles.title}>CATERING EXPERIENCE FOR EVERYONE</h1>
        <p className={styles.description}>
          Wouldn’t you like to give your next event something special? Catering
          services from Select give you a wide array of options to fit your
          unique needs. From buffets and sides to full meal service, we offer a
          range of catering options to meet your needs, and your budget.
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
