import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { routesConfig } from '@/routes';

import styles from './styles.module.css';

type LinksRenderType = {
  closeMenu: () => void;
  isMobile: boolean;
  isSticky: boolean;
};

const RenderLinks = ({ closeMenu, isMobile, isSticky }: LinksRenderType) => {
  const pathname = usePathname();

  return (
    <ul className={styles.linksContainer}>
      {routesConfig.map(
        (link) =>
          link.showInMenu && (
            <li key={link.title}>
              <Link
                onClick={closeMenu}
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

export default RenderLinks;
