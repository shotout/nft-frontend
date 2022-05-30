import {
  setHypeList,
  setOffFirstTimeRender,
  increaseOpenAppsCounter,
  changeAskRatingParameter,
} from '../../store/defaultState/actions';

export default dispatch => ({
  changeAskRatingParameter: (...args) =>
    dispatch(changeAskRatingParameter(...args)),
  setHypeList: (...args) => dispatch(setHypeList(...args)),
  setOffFirstTimeRender: (...args) => dispatch(setOffFirstTimeRender(...args)),
  increaseOpenAppsCounter: (...args) =>
    dispatch(increaseOpenAppsCounter(...args)),
});
