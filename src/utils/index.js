export const metaNameMapping = (meta) => {
  const headerMapping = {
    'x-last_page': 'lastPage',
    'x-page': 'currentPage',
    'x-page-size': 'pageSize',
    'x-total-items': 'totalItems',
  };
  const mappedMetas = {};
  Object.keys(headerMapping).forEach((metaKey) => {
    if (/^\d+$/.test(meta[metaKey])) {
      mappedMetas[headerMapping[metaKey]] = parseInt(meta[metaKey], 10);
    } else {
      mappedMetas[headerMapping[metaKey]] = meta[metaKey];
    }
  });
  return mappedMetas;
};

export const generateYearList = (startYear) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  let startYearLocal = startYear || 1979;
  while (startYearLocal < currentYear) {
    years.push((startYearLocal += 1));
  }
  return years.reverse();
};

export const generateAuthHeader = () => {
  const token = localStorage.getItem('x-auth-token');

  return {
    headers: {
      'X-Access-Token': `Bearer ${token}`,
    },
  };
};

export const buildMediaName = (bindingTitle, mediaType) => {
  const timestamp = Date.now();
  return `${bindingTitle}-${mediaType}-${timestamp}`;
};

export { paginate } from './pagination';
export { createToast } from './createToast';
