export const routes = {
  home: '/',
  giftCards: '/giftCards',
  careers: '/careers',
  contact: '/contact',
  menu: '/menu',
  reservation: '/reservation',
};

export const routesConfig = [
  {
    title: 'Home',
    url: routes.home,
    showInMenu: true,
    showInFooter: false,
  },
  {
    title: 'Gift Cards',
    url: routes.giftCards,
    showInMenu: true,
    showInFooter: true,
  },
  {
    title: 'Careers',
    url: routes.careers,
    showInMenu: true,
    showInFooter: true,
  },
  {
    title: 'Contact',
    url: routes.contact,
    showInMenu: true,
    showInFooter: true,
  },
  {
    title: 'Menu',
    url: routes.menu,
    showInMenu: false,
    showInFooter: true,
  },
  {
    title: 'Reservation',
    url: routes.reservation,
    showInMenu: false,
    showInFooter: true,
  },
];
