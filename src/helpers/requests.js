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

export const connectAirdrop = data =>
  Wrap({
    url: '/airdrop/store',
    method: 'POST',
    data,
  });

export const mintViaEmail = (id, data) =>
  Wrap({
    url: `/users/mint/${id}`,
    method: 'POST',
    data,
  });

export const updateUser = data =>
  Wrap({
    url: '/users',
    method: 'PATCH',
    data,
  });

export const deleteUser = () =>
  Wrap({
    url: '/users',
    method: 'DELETE',
  });

export const confirmDeleteUser = id =>
  Wrap({
    url: `/users/unregister/${id}`,
    method: 'GET',
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

export const getSkipResult = id =>
  Wrap({
    url: `/setting`,
    method: 'GET',
  });

export const getVersionApps = params =>
  Wrap({
    url: `/setting/version`,
    method: 'GET',
    params,
  });

export const getWalletToken = params =>
  Wrap({
    url: `/users/token`,
    method: 'GET',
    params,
  });

export const getContentHTML = id => {
  Wrap({
    url: `https://cdn.contentful.com/spaces/iekxawt54bzj/environments/master/entries/${id}`,
    method: 'GET',
    params: {
      access_token: 'PnEziYatZ-FrHJ-vus9Uxry0gJNXMU2g0dd-EB2xKOQ',
    },
  });
};

export const getImageContentHTML = id => {
  Wrap({
    url: `https://cdn.contentful.com/spaces/iekxawt54bzj/environments/master/assets/${id}`,
    method: 'GET',
    params: {
      access_token: 'PnEziYatZ-FrHJ-vus9Uxry0gJNXMU2g0dd-EB2xKOQ',
    },
  });
};
