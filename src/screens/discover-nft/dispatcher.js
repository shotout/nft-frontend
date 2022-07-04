import {
  setHypeList,
  setOffFirstTimeRender,
  increaseOpenAppsCounter,
  changeAskRatingParameter,
  setModalDeleteStatus,
  setAppStatus,
} from '../../store/defaultState/actions';
import {
  setCounterNumber,
  showLoadingModal,
} from '../../store/generalState/actions';

export default dispatch => ({
  changeAskRatingParameter: (...args) =>
    dispatch(changeAskRatingParameter(...args)),
  setHypeList: (...args) => dispatch(setHypeList(...args)),
  setOffFirstTimeRender: (...args) => dispatch(setOffFirstTimeRender(...args)),
  increaseOpenAppsCounter: (...args) =>
    dispatch(increaseOpenAppsCounter(...args)),
  setModalDeleteStatus: (...args) => dispatch(setModalDeleteStatus(...args)),
  setAppStatus: (...args) => dispatch(setAppStatus(...args)),
  showLoadingModal: (...args) => dispatch(showLoadingModal(...args)),
  setCounterNumber: (...args) => dispatch(setCounterNumber(...args)),
});
