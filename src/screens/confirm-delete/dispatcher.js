import {
  setDeleteUserStatus,
  setModalDeleteStatus,
  setProfileUser,
} from '../../store/defaultState/actions';

export default dispatch => ({
  setProfileUser: (...args) => dispatch(setProfileUser(...args)),
  setDeleteUserStatus: (...args) => dispatch(setDeleteUserStatus(...args)),
  setModalDeleteStatus: (...args) => dispatch(setModalDeleteStatus(...args)),
});
