import {showLoadingModal} from '../../store/generalState/actions';

export default dispatch => ({
  showLoadingModal: (...args) => dispatch(showLoadingModal(...args)),
});
