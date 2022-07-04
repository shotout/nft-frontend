import * as types from './types';

export const showLoadingModal = () => ({
  type: types.SHOW_LOADING_MODAL,
});

export const hideLoadingModal = () => ({
  type: types.HIDE_LOADING_MODAL,
});

export const setCounterNumber = payload => ({
  type: types.CHANGE_COUNTER_LOADING_MODAL,
  payload,
});
