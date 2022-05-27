import {
  setHypeList,
  setOffFirstTimeRender,
  increaseOpenAppsCounter,
} from '../../store/defaultState/actions';

export default dispatch => ({
  setHypeList: (...args) => dispatch(setHypeList(...args)),
  setOffFirstTimeRender: (...args) => dispatch(setOffFirstTimeRender(...args)),
  increaseOpenAppsCounter: (...args) =>
    dispatch(increaseOpenAppsCounter(...args)),
});
