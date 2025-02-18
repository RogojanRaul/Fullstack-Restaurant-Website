import React from 'react';
import Link from 'next/link';

import { routes } from '@/routes';

import styles from './styles.module.css';

type RenderLogoType = {
  isSticky: boolean;
  isHomePage: boolean;
};

const RenderLogo = ({ isSticky, isHomePage }: RenderLogoType) => {
  return (
    <div
      className={`${styles.logoContainer} ${
        isSticky && !isHomePage && styles.logoNavActive
      }`}
    >
      <Link href={routes.home}>
        <img
          src='select-logo.svg'
          alt='select logo'
          className={`${styles.logo}`}
        />
      </Link>
    </div>
  );
};

export default RenderLogo;
