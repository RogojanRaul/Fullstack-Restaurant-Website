import React from 'react';
import Link from 'next/link';
import { FaCopyright } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { FaFacebookSquare } from 'react-icons/fa';

import { routesConfig } from '@/routes';

import styles from './styles.module.css';

const Footer = () => {
  return (
    <>
      <div className={styles.footerWrapper}>
        <div className={styles.footer}>
          <div className={styles.containerInfo}>
            <div className='mb-4'>
              <h2>Greer, SC</h2>
              <p className={styles.infoLine}>
                <MdOutlineMailOutline /> info@dineatselect.com
              </p>
              <p className={styles.infoLine}>
                <IoPhonePortraitOutline /> 864.551.2264
              </p>
            </div>
            <div>
              <h2>112 Trade St.</h2>
              <p className={styles.infoLine}>
                <MdOutlineMailOutline /> select112@dineatselect.com
              </p>
            </div>
          </div>
          <img
            className={styles.footerLogo}
            src='/select-logo.svg'
            alt='select logo'
          />
          <div className={styles.hoursContainer}>
            <div className={styles.hours}>
              <h5>Hours</h5>
              <p>Everyday 9 am - 10 pm</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.subFooterWrapper}>
        <div className={styles.subFooter}>
          <a
            href='https://www.facebook.com/DineatSELECT112'
            target='_black'
            className='w-full flex-1 flex justify-center'
          >
            <FaFacebookSquare color='#1877F2' size={40} />
          </a>
          <div className={styles.subFooterMenuContainer}>
            <div className={styles.subFooterMenu}>
              {routesConfig.map((item, index) => (
                <div key={`${item.title}-${index}`}>
                  {item.showInFooter && (
                    <Link href={item.url} className={styles.link}>
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <p className='flex justify-center items-center gap-2 w-full'>
              <FaCopyright /> All rights reserved
            </p>
          </div>
          <div className='flex flex-col gap-1 w-full items-center md:items-end flex-1'>
            <a href='#' className='whitespace-nowrap'>
              Privacy
            </a>
            <a href='#' className='whitespace-nowrap'>
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
