export const BASE_IMAGE_URL =
  `${process.env.REACT_APP_BASE_API_URL}/api/media/?path=` ||
  'http://localhost:8000/api/media/?path=';
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL || 'http://localhost:8000';

export const ARTICLE_TYPES = {
  NEWS: 'news',
  PUBLICATION: 'publication',
};

export const SUPPORTED_IMAGE_TYPES = ['png', 'jpeg', 'jpg', 'jpe'];

export const TEAM_ROLES_ORDER = ['PI', 'Professor', 'Staff', 'Students', 'Alumni'];

export * from './navLinks';
