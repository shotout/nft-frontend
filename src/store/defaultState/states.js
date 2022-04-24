import {STORAGE_STATUS} from '../../helpers/static';
import * as types from './types';

const INITIAL_STATE = {
  storageStatus: STORAGE_STATUS.loading,
  walletList: [],
  userProfile: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_STORAGE_STATUS:
      return {
        ...state,
        storageStatus: action.payload,
      };
    case types.FETCH_WALLET_LIST:
      return {
        ...state,
        walletList: action.payload,
      };
    case types.SET_PROFILE_USER: {
      return {
        ...state,
        userProfile: action.payload,
      };
    }
    default:
      return state;
  }
};
