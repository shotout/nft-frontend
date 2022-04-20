import {getWallet} from '../../helpers/requests';
import * as types from './types';

export const setStorageStatus = payload => ({
  type: types.SET_STORAGE_STATUS,
  payload,
});

export const fetchWallet =
  (params = {}) =>
  async dispatch => {
    const res = await getWallet(params);
    dispatch({type: types.FETCH_WALLET_LIST, payload: res.data});
  };
