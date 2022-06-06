import {getWallet} from '../../helpers/requests';
import * as types from './types';

export const setAppVersion = payload => ({
  type: types.SET_APP_VERSION,
  payload,
});

export const setStorageStatus = payload => ({
  type: types.SET_STORAGE_STATUS,
  payload,
});

export const setProfileUser = payload => ({
  type: types.SET_PROFILE_USER,
  payload,
});

export const setHypeList = payload => ({
  type: types.SET_LIST_HYPE,
  payload,
});

export const setOffFirstTimeRender = () => ({
  type: types.SET_OFF_FIRST_TIME_RENDER,
});

export const increaseOpenArticleCounter = () => ({
  type: types.ADD_OPEN_ARTICLE_COUNTER,
});

export const increaseOpenAppsCounter = () => ({
  type: types.ADD_OPEN_APPS_COUNTER,
});

export const changeAskRatingParameter = () => ({
  type: types.CHANGE_ASK_RATING_PARAMETER,
});

export const fetchWallet =
  (params = {}) =>
  async dispatch => {
    const res = await getWallet(params);
    dispatch({type: types.FETCH_WALLET_LIST, payload: res.data});
  };
