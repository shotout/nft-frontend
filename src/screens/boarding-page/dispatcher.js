import {setDeleteUserStatus} from '../../store/defaultState/actions';

export default dispatch => ({
  setDeleteUserStatus: (...args) => dispatch(setDeleteUserStatus(...args)),
});
