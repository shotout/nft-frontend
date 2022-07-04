import {
  hideLoadingModal,
  setCounterNumber,
} from '../../store/generalState/actions';

export default dispatch => ({
  hideLoadingModal: (...args) => dispatch(hideLoadingModal(...args)),
  setCounterNumber: (...args) => dispatch(setCounterNumber(...args)),
});
