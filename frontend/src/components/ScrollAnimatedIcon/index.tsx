import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import styles from './styles.module.css';

const ScrollAnimatedIcon = () => {
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<any>(null);

  useGSAP(() => {
    tl.current = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.1,
      yoyo: true,
    });

    tl.current.to(wheelRef.current, {
      y: '10px',
      duration: 1,
      ease: 'back.out(1.7)',
    });
  }, []);

  return (
    <div className={styles.mouse}>
      <div ref={wheelRef} className={styles.wheel} />
    </div>
  );
};

export default ScrollAnimatedIcon;
