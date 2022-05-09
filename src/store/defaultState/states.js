import {STORAGE_STATUS} from '../../helpers/static';
import * as types from './types';

const INITIAL_STATE = {
  storageStatus: STORAGE_STATUS.loading,
  walletList: [],
  userProfile: {
    status: 'success',
    token: '10|WEH2WteExb3ktaJCimt3B4gFi9GBLhzM00KuqoPb',
    data: {
      id: 7,
      uuid: '8977d167-168a-48f4-a98e-e4b4858a4034',
      name: 'Test',
      email: 'Test@gmail.com',
      email_verified_at: '2022-04-28T03:41:26.000000Z',
      created_at: '2022-04-26T06:01:41.000000Z',
      updated_at: '2022-04-28T03:41:26.000000Z',
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
