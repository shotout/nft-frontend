import {
  changeAskRatingParameter,
  increaseOpenArticleCounter,
  setHypeList,
  setProfileUser,
} from '../../store/defaultState/actions';

export default dispatch => ({
  setProfileUser: (...args) => dispatch(setProfileUser(...args)),
  setHypeList: (...args) => dispatch(setHypeList(...args)),
  increaseOpenArticleCounter: (...args) =>
    dispatch(increaseOpenArticleCounter(...args)),
  changeAskRatingParameter: (...args) =>
    dispatch(changeAskRatingParameter(...args)),
});
