'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
              <Button
                variant='ternary'
                as='button'
                size='sm'
                iconOnly
                startIcon={<TfiMenu size={15} />}
                onClick={handleOpenMenu}
              />
              {renderLogo()}
              <Button
                variant='ternary'
                as='Link'
                href={routes.menu}
                size='sm'
                startIcon={<IoMdRestaurant size={15} />}
                iconOnly
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
