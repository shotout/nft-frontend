/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {isIphone} from './src/shared/devices';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('INCREMENT REMOTE MESSAGE');
  if (isIphone) {
    notifee.incrementBadgeCount();
  }
});

AppRegistry.registerComponent(appName, () => App);
