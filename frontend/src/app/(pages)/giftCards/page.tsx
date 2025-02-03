import React from 'react';

import { MdOutlineCardGiftcard } from 'react-icons/md';
import { GiftCardsType } from '@/types';

import styles from './styles.module.css';
import GiftCard from '@/components/GiftCard';

const giftCards: GiftCardsType[] = [
  {
    value: 5,
  },
  {
    value: 25,
  },
  {
    value: 50,
  },
  {
    value: 100,
  },
  {
    value: 'CUSTOM GIFT',
  },
];

const GiftCardsPage = () => {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>GIFT CARDS</h1>
        <span className={styles.line}></span>
        <MdOutlineCardGiftcard size={30} color={'var(--primary)'} />
      </div>
      <div className={styles.content}>
        <p className={styles.description}>
          Treat someone special to a delicious dining experience! Our gift cards
          are the perfect way to share unforgettable flavors and good times.
        </p>
        <div className={styles.cardsContainer}>
          {giftCards.map((card, index) => (
            <GiftCard key={index} value={card.value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftCardsPage;
