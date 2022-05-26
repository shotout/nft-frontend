import {setProfileUser} from '../../store/defaultState/actions';

export default dispatch => ({
  setProfileUser: (...args) => dispatch(setProfileUser(...args)),
});
