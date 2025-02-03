'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

import Button from '@/components/Button';
import { FaRegCalendarAlt } from 'react-icons/fa';

import styles from './styles.module.css';

const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const tl = useRef<any | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!titleRef.current || !imgRef.current || !descriptionRef.current) return;

    gsap.set(titleRef.current, { opacity: 0, x: -100 });
    gsap.set(imgRef.current, { opacity: 0 });
    gsap.set(descriptionRef.current, { opacity: 0, x: 100 });

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top+=100 bottom',
        end: 'center center',
        toggleActions: 'play none play reverse',
        preventOverlaps: true,
        scrub: 1,
      },
    });

    tl.current
      .to(titleRef.current, { opacity: 1, x: 0 })
      .to(imgRef.current, { opacity: 1 }, '<')
      .to(descriptionRef.current, { opacity: 1, x: 0 }, '<');
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <h1 ref={titleRef}>A JOURNEY OF TASTE BEYOND A BITE</h1>
      <img src='/imgs/img-2.png' alt='image' ref={imgRef} />
      <div ref={descriptionRef}>
        <p className={styles.description}>
          We offer a casually fine dining experience that empowers you with
          choice.
        </p>
        <Button
          variant='primary-secondary'
          as='Link'
          href='/menu'
          size='sm'
          startIcon={<FaRegCalendarAlt size={20} />}
          className={styles.btn}
        >
          Book a table
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
