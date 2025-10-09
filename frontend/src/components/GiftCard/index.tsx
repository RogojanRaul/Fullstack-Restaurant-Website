import React from 'react';

import { GiftCardsType } from '@/types';
import { FaDollarSign } from 'react-icons/fa';

import styles from './stryles.module.css';

type Props = { value: number | string };

const GiftCard = ({ value }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src='/imgs/cardCutOut.svg' alt='cutout' />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>Gift Card</p>
        <p
          className={styles.value}
          style={{ fontSize: typeof value === 'number' ? '70px' : '40px' }}
        >
          {typeof value === 'number' && (
            <span className={styles.icon}>
              <FaDollarSign size={30} />
            </span>
          )}
          <span>{value}</span>
        </p>
        <img
          src='aroma-logo-white.svg'
          alt='select logo'
          className={`${styles.logo}`}
        />
      </div>
    </div>
  );
};

export default GiftCard;
