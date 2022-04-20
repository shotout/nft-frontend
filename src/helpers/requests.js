import Wrap from './axiosWrapper';

export const getFaq = () =>
  Wrap({
    url: '/faqs',
    method: 'get',
  });

export const getFlagFAQ = (params = '') =>
  Wrap({
    url: `/faqs/${params}`,
    method: 'get',
  });

export const getWallet = () =>
  Wrap({
    url: '/wallet',
    method: 'get',
  });

export const getProduct = () =>
  Wrap({
    url: '/products',
    method: 'get',
  });

export const postRegister = data =>
  Wrap({
    url: '/auth/register',
    method: 'POST',
    data,
  });
