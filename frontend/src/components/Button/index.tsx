'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';

import { ButtonTypes } from '@/types/ButtonTypes';

import styles from './styles.module.css';

const Button = ({
  as = 'button',
  href,
  children,
  variant,
  startIcon,
  endIcon,
  fullWidth,
  size,
  onClick,
  target,
  download,
  disabled,
  className,
  margin,
  iconOnly,
}: ButtonTypes) => {
  const currentVariant = useMemo(() => styles[variant], [variant]);
  const btnSize = useMemo(() => styles[size], [size]);

  const width = useMemo(
    () => (fullWidth ? '100%' : 'max-content'),
    [fullWidth]
  );

  const Wrapper = useMemo(() => {
    switch (as) {
      case 'button':
        return 'button';
      case 'a':
        return 'a';
      case 'Link':
        return Link;
      default:
        return 'button';
    }
  }, [as]);

  const icon = useMemo(() => {
    return (icon: any) => {
      if (typeof icon === 'string') {
        return <img className={styles.icon} src={icon} alt='icon' />;
      } else if (React.isValidElement(icon)) {
        return <span className={styles.icon}>{icon}</span>;
      }
    };
  }, [startIcon, endIcon]);

  const classes = [
    styles.wrapper,
    styles.button,
    currentVariant,
    btnSize,
    iconOnly ? styles.iconOnly : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Wrapper
      href={href}
      target={target}
      download={download && href}
      style={{ width, margin }}
      className={classes}
      onClick={onClick}
    >
      {startIcon && <span className={styles.btnIcon}>{icon(startIcon)}</span>}
      {!iconOnly && <p className={styles.btnText}>{children}</p>}
      {endIcon && <span className={styles.btnIcon}>{icon(endIcon)}</span>}
    </Wrapper>
  );
};

export default Button;
