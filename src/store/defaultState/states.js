import {STORAGE_STATUS} from '../../helpers/static';
import * as types from './types';

const INITIAL_STATE = {
  storageStatus: STORAGE_STATUS.loading,
  walletList: [],
  userProfile: {
    status: 'success',
    token: '4|3IPXUKmu6zXrs1PvOKauFFtSWSt9t2PoscEHXKmS',
    data: {
      id: 4,
      uuid: 'e170f023-523f-4473-b00b-1a1e9557982b',
      name: 'Fff',
      email: 'hey@mail.com',
      email_verified_at: '2022-04-20T08:56:39.000000Z',
      created_at: '2022-04-20T08:55:22.000000Z',
      updated_at: '2022-04-20T08:56:39.000000Z',
    },
  },
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
    default:
      return state;
  }
};
