import {
  setDeleteUserStatus,
  setProfileUser,
} from '../../store/defaultState/actions';

export default dispatch => ({
  setProfileUser: (...args) => dispatch(setProfileUser(...args)),
  setDeleteUserStatus: (...args) => dispatch(setDeleteUserStatus(...args)),
});
