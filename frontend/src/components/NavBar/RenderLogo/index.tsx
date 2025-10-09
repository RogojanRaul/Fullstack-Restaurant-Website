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
        !isHomePage && styles.logoNavActive
      }`}
    >
      <Link href={routes.home}>
        <img
          src='aroma-logo-white.svg'
          alt='select logo'
          className={`${styles.logo}`}
        />
      </Link>
    </div>
  );
};

export default RenderLogo;
