import React from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { IoMdRestaurant } from 'react-icons/io';
import { FaRegCalendarAlt } from 'react-icons/fa';

import Button from '@/components/Button';
import DineDifferent from '@/components/DineDifferent';
import { routes } from '@/routes';
import RenderLinks from '../RenderLinks';

import styles from './styles.module.css';

type RenderMobileMenuType = {
  openMenu: boolean;
  closeMenu: () => void;
  isMobile: boolean;
  isSticky: boolean;
};

const RenderMobileMenu = ({
  openMenu,
  closeMenu,
  isMobile,
  isSticky,
}: RenderMobileMenuType) => {
  return (
    <div
      className={`${styles.mobileMenuContainer} ${
        openMenu && styles.mobileMenuContainerActive
      }`}
    >
      <div className={styles.mobileMenu}>
        {
          <RenderLinks
            closeMenu={closeMenu}
            isMobile={isMobile}
            isSticky={isSticky}
          />
        }
        <div className={styles.closeMenuBtn}>
          <Button
            variant='ternary'
            as='button'
            size='sm'
            startIcon={<MdOutlineClose size={25} />}
            iconOnly
            onClick={closeMenu}
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
            onClick={closeMenu}
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
            onClick={closeMenu}
          >
            Reservation
          </Button>
        </div>
      </div>
      <div>{<DineDifferent />}</div>
    </div>
  );
};

export default RenderMobileMenu;
