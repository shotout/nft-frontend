import {Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export const openWeb = async url => {
  if (await InAppBrowser.isAvailable()) {
    const result = await InAppBrowser.open(url, {
      dismissButtonStyle: 'cancel',
      enableUrlBarHiding: true,
      hasBackButton: false,
      enableDefaultShare: false,
      showInRecents: true,
      forceCloseOnRedirection: false,
    });
    console.log('Reesult :', result);
  } else {
    console.log('didnt support in app browser');
    Linking.openURL(url);
  }
};
