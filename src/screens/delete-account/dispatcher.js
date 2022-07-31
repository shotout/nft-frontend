import {setProfileUser} from '../../store/defaultState/actions';
import {setCounterNumber} from '../../store/generalState/actions';

export default dispatch => ({
  setProfileUser: (...args) => dispatch(setProfileUser(...args)),
  setCounterNumber: (...args) => dispatch(setCounterNumber(...args)),
});
