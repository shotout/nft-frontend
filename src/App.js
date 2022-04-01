import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {LocalizeProvider} from 'react-localize-redux';
// import messaging from '@react-native-firebase/messaging';
import Navigator from './Routes';
import store, {persistor} from './store/configure-store';

const App = () => {
  // const getToken = async () => {
  //   try {
  //     const fcmToken = await messaging().getToken();
  //     console.log('Check fcm:', fcmToken);
  //   } catch (err) {
  //     console.log('firebase error', err);
  //   }
  // };

  useEffect(() => {
    // getToken();
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
