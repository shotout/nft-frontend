import {setProfileUser} from '../../store/defaultState/actions';
import {showLoadingModal} from '../../store/generalState/actions';

export default dispatch => ({
  setProfileUser: (...args) => dispatch(setProfileUser(...args)),
  showLoadingModal: (...args) => dispatch(showLoadingModal(...args)),
});
