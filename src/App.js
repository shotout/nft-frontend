import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {LocalizeProvider} from 'react-localize-redux';
import {Adjust, AdjustConfig} from 'react-native-adjust';
import Navigator from './Routes';
import store, {persistor} from './store/configure-store';

console.disableYellowBox = true;
const App = () => {
  const networkDebugger = () => {
    // network debugger
    global.XMLHttpRequest = global.originalXMLHttpRequest
      ? global.originalXMLHttpRequest
      : global.XMLHttpRequest;
    global.FormData = global.originalFormData
      ? global.originalFormData
      : global.FormData;

    // eslint-disable-next-line no-unused-expressions
    fetch; // Ensure to get the lazy property

    if (window.__FETCH_SUPPORT__) {
      // it's RNDebugger only to have
      window.__FETCH_SUPPORT__.blob = false;
    } else {
      /*
       * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
       * If you're using another way you can just use the native Blob and remove the `else` statement
       */
      global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
      global.FileReader = global.originalFileReader
        ? global.originalFileReader
        : global.FileReader;
    }
  };

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

  useEffect(() => {
    networkDebugger();
    configTracker();
  }, []);

  return (
    <Provider store={store}>
      <LocalizeProvider store={store}>
        <PersistGate persistor={persistor}>
          <Navigator />
        </PersistGate>
      </LocalizeProvider>
    </Provider>
  );
};

export default App;
