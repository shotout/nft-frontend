import {
  changeAskRatingParameter,
  increaseOpenArticleCounter,
  setHypeList,
} from '../../store/defaultState/actions';

export default dispatch => ({
  setHypeList: (...args) => dispatch(setHypeList(...args)),
  increaseOpenArticleCounter: (...args) =>
    dispatch(increaseOpenArticleCounter(...args)),
  changeAskRatingParameter: (...args) =>
    dispatch(changeAskRatingParameter(...args)),
});
