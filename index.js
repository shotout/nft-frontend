/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import App from './src/App';
import {name as appName} from './app.json';
import {isIphone} from './src/shared/devices';

// Register background handler

// const handleAddBadgeNotification = count => {
//   console.log('ADD BADGE NUMBER:', count + 1);
//   PushNotificationIOS.setApplicationIconBadgeNumber(count + 1);
// };

// const onRemoteNotification = () => {
//   if (isIphone) {
//     PushNotificationIOS.getApplicationIconBadgeNumber(
//       handleAddBadgeNotification,
//     );
//   }
// };

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
//   onRemoteNotification();
// });

AppRegistry.registerComponent(appName, () => App);
