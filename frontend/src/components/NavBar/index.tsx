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
import { routes } from '@/routes';
import Logo from '/public/select-logo.svg';

import styles from './styles.module.css';
import useIsSticky from '@/hooks/useIsSticky';
import RenderLinks from './RenderLinks';
import RenderMobileMenu from './RenderMobileMenu';
import RenderLogo from './RenderLogo';

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isSticky = useIsSticky(navRef, false);

  const isHomePage = pathname === routes.home;

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <nav className={styles.navWrapper}>
        <div
          ref={navRef}
          className={`${styles.navContainer} ${isSticky && styles.navActive}`}
        >
          {isMobile ? (
            <Button
              variant='ternary'
              as='button'
              size='sm'
              iconOnly
              startIcon={<TfiMenu size={15} />}
              onClick={handleOpenMenu}
            />
          ) : (
            <RenderLinks
              closeMenu={handleCloseMenu}
              isMobile={isMobile}
              isSticky={isSticky}
            />
          )}

          <RenderLogo isSticky={isSticky} isHomePage={isHomePage} />

          {isMobile ? (
            <Button
              variant='ternary'
              as='Link'
              href={routes.menu}
              size='sm'
              startIcon={<IoMdRestaurant size={15} />}
              iconOnly
            />
          ) : (
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
          )}
        </div>
      </nav>
      {isMobile && (
        <>
          <RenderMobileMenu
            openMenu={openMenu}
            closeMenu={handleCloseMenu}
            isMobile={isMobile}
            isSticky={isSticky}
          />
        </>
      )}
    </>
  );
};

export default NavBar;
