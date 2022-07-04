import * as types from './types';

const INIT_STATE = {
  loadingModal: {
    visible: false,
    counter: 0,
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.SHOW_LOADING_MODAL:
      return {
        ...state,
        loadingModal: {
          visible: true,
          counter: 0,
        },
      };
    case types.CHANGE_COUNTER_LOADING_MODAL:
      return {
        ...state,
        loadingModal: {
          ...state.loadingModal,
          counter: action.payload,
        },
      };
    case types.HIDE_LOADING_MODAL:
      return {
        ...state,
        loadingModal: {
          ...state.loadingModal,
          visible: false,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
