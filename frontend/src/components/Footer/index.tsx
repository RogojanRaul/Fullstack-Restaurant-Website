'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCopyright } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { FaFacebookSquare } from 'react-icons/fa';

import { routesConfig } from '@/routes';
import { get } from '@/Fetch';
import { Location } from '@/types';

import styles from './styles.module.css';

const Footer = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = (await get({
          url: 'api/locations',
        })) as Location[];
        console.log(response);
        setLocations(response);
      } catch (error) {
        console.log(error);
      }
    };
    getLocations();
  }, []);

  return (
    <>
      <div className={styles.footerWrapper}>
        <div className={styles.footer}>
          <div className={styles.containerInfo}>
            {locations.map((location) => (
              <div key={location._id}>
                <h1 className='mb-1 text-xl font-bold'>{location.title}</h1>
                <a
                  href={`tel:${location.phoneNumber}`}
                  className={styles.infoLine}
                >
                  <IoPhonePortraitOutline /> {location.phoneNumber}
                </a>
                <a
                  href={`mailto:${location.emailAddress}`}
                  className={styles.infoLine}
                >
                  <MdOutlineMailOutline /> {location.emailAddress}
                </a>
              </div>
            ))}
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
