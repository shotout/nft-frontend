import {createSelector} from 'reselect';

const authorizationSelector = state => state.defaultState;

export const userCredentialSelector = createSelector(
  authorizationSelector,
  defaultState => defaultState.userProfile,
);

export const appVersion = createSelector(
  authorizationSelector,
  defaultState => defaultState.appVersion,
);
