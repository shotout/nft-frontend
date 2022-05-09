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
    url: 'https://cdn.contentful.com/spaces/iekxawt54bzj/environments/master/entries/?access_token=PnEziYatZ-FrHJ-vus9Uxry0gJNXMU2g0dd-EB2xKOQ',
    method: 'get',
  });

export const getProduct = (params = {}) =>
  Wrap({
    url: '/products',
    method: 'get',
    params,
  });

export const postRegister = data =>
  Wrap({
    url: '/auth/register',
    method: 'POST',
    data,
  });

export const updateUser = data =>
  Wrap({
    url: '/users',
    method: 'PATCH',
    data,
  });

export const addWatchlist = id =>
  Wrap({
    url: `/watchlists/${id}`,
    method: 'POST',
  });

export const removeWatchlist = id =>
  Wrap({
    url: `/watchlists/${id}`,
    method: 'DELETE',
  });

export const postLogin = data =>
  Wrap({
    url: '/auth/login',
    method: 'POST',
    data,
  });

export const verifyToken = id =>
  Wrap({
    url: `/auth/verify/${id}`,
    method: 'GET',
  });

export const listWatchlist = params =>
  Wrap({
    url: `/watchlists`,
    method: 'GET',
    params,
  });
export const getProfile = params =>
  Wrap({
    url: `/users`,
    method: 'GET',
    params,
  });

export const getDetailProduct = id =>
  Wrap({
    url: `/products/${id}`,
    method: 'GET',
  });
