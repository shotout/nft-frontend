import {setHypeList} from '../../store/defaultState/actions';

export default dispatch => ({
  setHypeList: (...args) => dispatch(setHypeList(...args)),
});
