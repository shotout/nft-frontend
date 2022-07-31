import {
  setCounterNumber,
  showLoadingModal,
} from '../../store/generalState/actions';

export default dispatch => ({
  setCounterNumber: (...args) => dispatch(setCounterNumber(...args)),
  showLoadingModal: (...args) => dispatch(showLoadingModal(...args)),
});
