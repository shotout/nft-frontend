import {
  setHypeList,
  setOffFirstTimeRender,
} from '../../store/defaultState/actions';

export default dispatch => ({
  setHypeList: (...args) => dispatch(setHypeList(...args)),
  setOffFirstTimeRender: (...args) => dispatch(setOffFirstTimeRender(...args)),
});
