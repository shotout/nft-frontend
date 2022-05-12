import {Linking, Alert} from 'react-native';

const handleLinking = async (url, mode = 'background') => {
  console.log('Check url:', url, mode);
};

export const appWokeUp = event => {
  // this handles the use case where the app is running in the background and is activated by the listener...
  // Alert.alert('Linking Listener', `url  ${event.url}`);
  handleLinking(event.url, 'foreground');
};
