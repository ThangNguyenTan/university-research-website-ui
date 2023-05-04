export const NAV_LINKS = {
  HOME: {
    text: 'home',
    path: '/',
  },
  ABOUT: {
    text: 'about',
    path: '/about',
  },
  NEWS: {
    text: 'news',
    path: '/news',
  },
  PUBLICATIONS: {
    text: 'publications',
    path: '/publications',
  },
  PEOPLE: {
    text: 'team',
    path: '/people',
  },
  JOIN_US: {
    text: 'join us',
    path: '/join-us',
  },
  CONTACT: {
    text: 'contact',
    path: '/contact',
  },
};

export const NOT_AUTHED_NAV = [...Object.keys(NAV_LINKS).map((key) => NAV_LINKS[key])];

export const AUTHED_NAV = [
  ...Object.keys(NAV_LINKS).map((key) => NAV_LINKS[key]),
  {
    text: 'manage',
    path: '/manage/articles',
  },
  {
    text: 'logout',
    path: '/logout',
    style: 'text-danger',
  },
];

export const ADMIN_NAV = [
  NAV_LINKS.HOME,
  {
    text: 'articles',
    path: '/manage/articles',
  },
  {
    text: 'people',
    path: '/manage/people',
  },
  {
    text: 'jobs',
    path: '/manage/jobs',
  },
  {
    text: 'logout',
    path: '/logout',
    style: 'text-danger',
  },
];
