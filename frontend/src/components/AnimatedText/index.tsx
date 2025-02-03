'use client';

import React, { ReactNode, useEffect, useRef } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';

export type AnimationDirection = 'up' | 'down' | 'left' | 'right';

export interface AnimatedTextProps {
  children: ReactNode;
  splitBy?: 'words' | 'chars';
  staggerDelay?: number;
  delay?: number;
  direction?: AnimationDirection;
  className?: string;
  style?: any;
}

const AnimatedText = ({
  children,
  splitBy = 'chars',
  staggerDelay = 0.05,
  delay = 0,
  direction = 'up',
  className,
  style,
}: AnimatedTextProps) => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const tl = useRef<any>(null);

  const getInitialPosition = (direction: AnimationDirection) => {
    switch (direction) {
      case 'up':
        return { y: 100, opacity: 0 };
      case 'down':
        return { y: -100, opacity: 0 };
      case 'left':
        return { x: -100, opacity: 0 };
      case 'right':
        return { x: 100, opacity: 0 };
    }
  };

  const getFinalPosition = (direction: AnimationDirection) => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
    }
  };

  useEffect(() => {
    if (!textRef.current) return;

    if (splitRef.current) {
      splitRef.current.revert();
    }

    tl.current = gsap.timeline();

    splitRef.current = new SplitType(textRef.current, {
      types: splitBy === 'chars' ? 'chars' : 'words',
      tagName: 'span',
    });

    const elements =
      splitBy === 'chars' ? splitRef.current.chars : splitRef.current.words;

    if (!elements) return;

    gsap.set(textContainerRef.current, { opacity: 0 });
    gsap.set(elements, getInitialPosition(direction));

    tl.current.to(textContainerRef.current, { opacity: 1 }).to(elements, {
      ...getFinalPosition(direction),
      duration: 1,
      stagger: staggerDelay,
      delay: delay,
      ease: 'power4.out',
    });

    return () => {
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, [children, splitBy, staggerDelay, direction, delay]);

  return (
    <div
      ref={textContainerRef}
      className={`overflow-hidden opacity-0 ${className || ''}`}
      style={style}
    >
      <p ref={textRef}>{children}</p>
    </div>
  );
};

export default AnimatedText;
