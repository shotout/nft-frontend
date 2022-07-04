import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {LocalizeProvider} from 'react-localize-redux';
import {Adjust, AdjustConfig} from 'react-native-adjust';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';
import Navigator from './Routes';
import store, {persistor} from './store/configure-store';
import ModalLoadingInitial from './components/modal-loading-initial';
import {networkDebugger} from './shared/networkDebugger';

LogBox.ignoreAllLogs();

const App = () => {
  const configTracker = () => {
    const adjustConfig = new AdjustConfig(
      'aelirtp6kiyo',
      // AdjustConfig.EnvironmentSandbox,
      AdjustConfig.EnvironmentProduction,
    );
    adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
    Adjust.create(adjustConfig);
    console.log('Finish set configtracker');
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@notification');
      console.log('Async value:', value);
    } catch (e) {
      // error reading value
      console.log('ASync error:', e);
    }
  };

  useEffect(() => {
    networkDebugger();
    configTracker();
    getData();
  }, []);

  return (
    <Provider store={store}>
      <LocalizeProvider store={store}>
        <PersistGate persistor={persistor}>
          <Navigator />
          <ModalLoadingInitial />
        </PersistGate>
      </LocalizeProvider>
    </Provider>
  );
};

export default App;
