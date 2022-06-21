import moment from 'moment';
import {STORAGE_STATUS} from '../../helpers/static';
import * as types from './types';

const INITIAL_STATE = {
  storageStatus: STORAGE_STATUS.loading,
  walletList: [],
  userProfile: {
    // status: 'success',
    // token: '10|WEH2WteExb3ktaJCimt3B4gFi9GBLhzM00KuqoPb',
    // data: {
    //   id: 7,
    //   uuid: '8977d167-168a-48f4-a98e-e4b4858a4034',
    //   name: 'Test',
    //   email: 'Test@gmail.com',
    //   email_verified_at: '2022-04-28T03:41:26.000000Z',
    //   created_at: '2022-04-26T06:01:41.000000Z',
    //   updated_at: '2022-04-28T03:41:26.000000Z',
    // },
  },
  listHype: [
    // {idProject: '', currentAmount: '', dateAdded: '',}
  ],
  isFirstTimeRender: true,
  openAppsCounter: 0,
  openArticleCounter: 0,
  haveBeenAskRating: null,
  appVersion: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_OPEN_APPS_COUNTER:
      return {
        ...state,
        openAppsCounter: state.openAppsCounter + 1,
      };
    case types.ADD_OPEN_ARTICLE_COUNTER:
      return {
        ...state,
        openArticleCounter: state.openArticleCounter + 1,
      };
    case types.SET_APP_VERSION:
      return {
        ...state,
        appVersion: action.payload,
      };
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
      if (action.payload === 'reset') {
        console.log('STATE LOGOUT');
        return {
          ...state,
          // walletList: [],
          listHype: [],
          isFirstTimeRender: true,
          openAppsCounter: 0,
          openArticleCounter: 0,
          haveBeenAskRating: null,
          userProfile: {},
        };
      }
      if (action.payload === null) {
        console.log('STATE RESET');
        return {
          ...state,
          // walletList: [],
          listHype: [],
          isFirstTimeRender: true,
          openAppsCounter: 0,
          openArticleCounter: 0,
          haveBeenAskRating: null,
          // appVersion: null,
        };
      }
      return {
        ...state,
        userProfile: action.payload,
      };
    }
    case types.SET_LIST_HYPE: {
      return {
        ...state,
        listHype: action.payload,
      };
    }
    case types.SET_OFF_FIRST_TIME_RENDER:
      return {
        ...state,
        isFirstTimeRender: false,
      };
    case types.CHANGE_ASK_RATING_PARAMETER:
      return {
        ...state,
        haveBeenAskRating: moment().format('YYYY-MM-DD'),
      };
    default:
      return state;
  }
};
