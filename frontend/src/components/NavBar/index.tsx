'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { TfiMenu } from 'react-icons/tfi';
import { IoMdRestaurant } from 'react-icons/io';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';

import Button from '../Button';
import DineDifferent from '../DineDifferent';

import useIsMobile from '@/hooks/useIsMobile';
import { routes, routesConfig } from '@/routes';
import Logo from '/public/select-logo.svg';

import styles from './styles.module.css';
import useIsSticky from '@/hooks/useIsSticky';

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const smallLogoRef = useRef<HTMLImageElement | null>(null);
  const menuButtonRef = useRef(null);
  const reservationButtonRef = useRef(null);
  const tl = useRef<any>(null);

  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isSticky = useIsSticky(navRef, false);

  const isHomePage = pathname === routes.home;

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = (e: any) => {
    setOpenMenu(false);
  };

  // useEffect(() => {
  //   if (tl.current) {
  //     tl.current?.progress(0);
  //   }
  // }, [pathname]);

  // useGSAP(() => {
  //   if (
  //     !navRef.current ||
  //     !menuButtonRef.current ||
  //     !reservationButtonRef.current
  //   )
  //     return;

  //   gsap.registerPlugin(ScrollTrigger);

  //   ScrollTrigger.refresh();

  //   if (tl.current) {
  //     tl.current.kill();
  //     tl.current = null;
  //     tl.current?.progress(0);
  //   }

  //   tl.current = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: navRef.current,
  //       start: 'clamp(top+=100 top)',
  //       end: 'clamp(+=400)',
  //       toggleActions: 'play none play reverse',
  //       preventOverlaps: true,
  //       scrub: true,
  //       invalidateOnRefresh: true,
  //       markers: true,
  //       id: 'navbarTrigger',
  //       onUpdate: (self) => console.log('progress:', self.progress),
  //     },
  //   });

  //   tl.current
  //     .to(navRef.current, {
  //       background: 'rgba(20, 21, 23, 0.7)',
  //       backdropFilter: 'blur(10px)',
  //       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  //       padding: '15px 40px',
  //       marginTop: '15px',
  //       border: 'none',
  //       borderRadius: '20px',
  //     })
  //     .to(
  //       '#link',
  //       {
  //         fontSize: '16px',
  //       },
  //       '<'
  //     )
  //     .to(
  //       [menuButtonRef.current, reservationButtonRef.current],
  //       {
  //         padding: '0.6rem 1.2rem',
  //         fontSize: '0.9rem',
  //         color: (index: number) => (index === 0 ? 'black' : 'white'),
  //         stagger: 0,
  //         backgroundColor: (index: number) =>
  //           index === 0 ? '#fce4b1 ' : '#c1223c',
  //         border: (index: number) =>
  //           index === 0 ? '1px solid #fce4b1 ' : '1px solid #c1223c',
  //       },
  //       '<'
  //     )
  //     .to(
  //       smallLogoRef.current,
  //       {
  //         opacity: isHomePage ? 0 : 1,
  //       },
  //       '<'
  //     );

  //   return () => {
  //     if (tl.current) {
  //       tl.current.kill();
  //       tl.current = null;
  //       tl.current?.progress(0);
  //     }

  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //     ScrollTrigger.refresh();
  //   };
  // }, [isHomePage, pathname]);

  const renderLinks = () => {
    return (
      <ul className={styles.linksContainer}>
        {routesConfig.map(
          (link) =>
            link.showInMenu && (
              <li key={link.title}>
                <Link
                  onClick={handleCloseMenu}
                  id={!isMobile ? 'link' : ''}
                  href={link.url}
                  className={`${styles.link} ${
                    link.url === pathname && styles.active
                  } ${isSticky && styles.linkNavActive}`}
                >
                  {link.title}
                </Link>
              </li>
            )
        )}
      </ul>
    );
  };

  const renderMobileMenu = () => {
    return (
      <div
        className={`${styles.mobileMenuContainer} ${
          openMenu && styles.mobileMenuContainerActive
        }`}
      >
        <div className={styles.mobileMenu}>
          {renderLinks()}
          <div className={styles.closeMenuBtn}>
            <Button
              variant='ternary'
              as='button'
              size='sm'
              startIcon={<MdOutlineClose size={25} />}
              iconOnly
              onClick={handleCloseMenu}
            />
          </div>
          <div className={styles.mobileCallToActionBtns}>
            <Button
              variant='ternary-secondary'
              as='Link'
              href={routes.menu}
              size='sm'
              startIcon={<IoMdRestaurant size={15} />}
              fullWidth
              onClick={handleCloseMenu}
            >
              Menu
            </Button>
            <Button
              variant='ternary-secondary'
              as='Link'
              href={routes.reservation}
              size='sm'
              startIcon={<FaRegCalendarAlt size={15} />}
              fullWidth
              onClick={handleCloseMenu}
            >
              Reservation
            </Button>
          </div>
        </div>
        <div>{<DineDifferent />}</div>
      </div>
    );
  };

  const renderLogo = () => {
    return (
      <div
        ref={smallLogoRef}
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

  return (
    <>
      <nav className={styles.navWrapper}>
        <div
          ref={navRef}
          className={`${styles.navContainer} ${isSticky && styles.navActive}`}
        >
          {!isMobile && renderLinks()}
          {!isMobile && renderLogo()}
          {!isMobile ? (
            <div className={styles.callToActionBtns}>
              <Button
                variant={isSticky ? 'ternary-secondary' : 'ternary'}
                as='Link'
                href={routes.menu}
                size={isSticky ? 'xs' : 'sm'}
                startIcon={<IoMdRestaurant size={15} />}
              >
                Menu
              </Button>
              <Button
                variant={isSticky ? 'ternary-ternary' : 'ternary'}
                as='Link'
                href={routes.reservation}
                size={isSticky ? 'xs' : 'sm'}
                startIcon={<FaRegCalendarAlt size={15} />}
              >
                Reservation
              </Button>
            </div>
          ) : (
            <div className='w-full flex justify-between items-center'>
              {renderLogo()}
              <Button
                variant='ternary'
                as='button'
                size='sm'
                iconOnly
                startIcon={<TfiMenu size={15} />}
                onClick={handleOpenMenu}
              />
            </div>
          )}
        </div>
      </nav>
      {isMobile && <>{renderMobileMenu()}</>}
    </>
  );
};

export default NavBar;
