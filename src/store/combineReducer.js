import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {localizeReducer} from 'react-localize-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

// reducer state
import defaultState from './defaultState/states';
import generalState from './generalState';
import {setStorageStatus} from './defaultState/actions';
import {STORAGE_STATUS} from '../helpers/static';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  // blacklist: ['authorizationReducer', 'commonReducer'],
};

const commonPersistConfig = {
  key: 'defaultState',
  storage: AsyncStorage,
  whitelist: ['walletList'],
};

const rootReducers = combineReducers({
  defaultState: persistReducer(commonPersistConfig, defaultState),
  localize: localizeReducer,
  generalState,
});

const pReducers = persistReducer(persistConfig, rootReducers);

export default () => {
  const store = createStore(
    pReducers,
    composeWithDevTools(applyMiddleware(ReduxThunk)),
  );
  const persistor = persistStore(store, undefined, () => {
    store.dispatch(setStorageStatus(STORAGE_STATUS.rehydrated));
  });
  return {store, persistor};
};
