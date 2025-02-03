'use client';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger, Draggable } from 'gsap/all';

import Button from '@/components/Button';
import DineDifferent from '@/components/DineDifferent';

import { useMousePosition } from '@/hooks/useMousePosition';
import { galleryData } from './galleryData';
import { FaRegCalendarAlt } from 'react-icons/fa';

import styles from './style.module.css';
import useIsMobile from '@/hooks/useIsMobile';

const Gallery = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const galleryContainerRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const dragInstance = useRef<Draggable | null>(null);

  const tl = useRef<any>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const { isHovered } = useMousePosition(galleryContainerRef);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, Draggable);

    if (!galleryRef.current) return;

    const gallery = galleryRef.current;
    const images = gallery.children;
    const imageWidth = images[0].getBoundingClientRect().width;
    const gap = isMobile ? 40 : 20;
    const totalWidth = imageWidth * images.length + gap * (images.length - 1);

    gsap.set(gallery, {
      x: -(imageWidth / 2),
    });

    dragInstance.current = Draggable.create(gallery, {
      type: 'x',
      inertia: true,
      bounds: {
        minX: -totalWidth + imageWidth / 2,
        maxX: -imageWidth / 2,
      },
      onDrag: function () {
        updateActiveImage(this.x);
      },
      onThrowUpdate: function () {
        updateActiveImage(this.x);
      },
    })[0];

    const updateActiveImage = (x: number) => {
      const currentPosition = Math.abs(x + imageWidth / 2);
      const newIndex = Math.round(currentPosition / imageWidth);
      setActiveIndex(Math.min(newIndex, images.length - 1));
    };

    gsap.set(textRef.current, { x: 100, opacity: 0 });
    gsap.set(imgRef.current, { x: -100, opacity: 0 });

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom-=100',
        end: 'bottom bottom',
        toggleActions: 'play none play reverse',
        preventOverlaps: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl.current
      .to(textRef.current, {
        x: 0,
        opacity: 1,
      })
      .to(
        imgRef.current,
        {
          x: 0,
          opacity: 1,
        },
        '<'
      );

    return () => {
      dragInstance.current?.kill();
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.mainImgContainer}>
          <img
            ref={imgRef}
            className={styles.mainImg}
            src='/imgs/gallery-main-img-min.jpg'
            alt='image'
          />
        </div>
        <div className={styles.content}>
          <div ref={textRef} className={styles.text}>
            <DineDifferent color='var(--accent-2)' />
            <h1 className={styles.title}>WE OFFER THE BEST EXPERIENCE</h1>
            <Button
              variant='primary-secondary'
              as='Link'
              href='/menu'
              size='sm'
              startIcon={<FaRegCalendarAlt size={20} />}
            >
              Make a Reservation
            </Button>
          </div>
          <div ref={galleryContainerRef} className={styles.galleryContainer}>
            <div
              ref={galleryRef}
              className={`${styles.gallery} ${isHovered ? styles.hovered : ''}`}
            >
              {galleryData.map((image, index) => (
                <div
                  key={index}
                  className={`${styles.galleryImgContainer} ${
                    index === activeIndex ? styles.active : ''
                  }`}
                >
                  <img src={image.img} alt='gallery img' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
