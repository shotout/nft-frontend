import {Linking} from 'react-native';

const handlegetInitialURL = async () => {
  // As a fallback, you may want to do the default deep link handling
  const url = await Linking.getInitialURL();

  return url;
};

// Custom function to subscribe to incoming links
const handleSubscribe = listener => {
  // Listen to incoming links from Firebase Dynamic Links

  // Listen to incoming links from deep linking
  const linkingSubscription = Linking.addEventListener('url', ({url}) => {
    console.log('URL LISTENER :', url);
    listener(url);
  });

  return () => {
    // Clean up the event listeners
    linkingSubscription.remove();
  };
};

const config = {
  screens: {
    ValidateToken: {
      path: 'api/v1/auth/verify/:id',
      parse: {
        id: id => `${id}`,
      },
    },
    DeleteAccount: {
      path: 'api/v1/users/unregister/:id',
      parse: {
        id: id => `${id}`,
      },
    },
    Register: {
      path: 'register',
      parse: {
        id: id => `${id}`,
      },
    },
    DetailProduct: {
      path: 'article/:id',
      parse: {
        id: id => `${id}`,
      },
    },
    Signin: 'signin',
    // AccountSettings: 'connected-wallet',
    // Homepage: '*',
  },
};

export const linking = {
  prefixes: ['https://backend.nftdaily.app', 'nftdaily://'],
  // prefixes: ['nftapps://link'],
  config,
  // getInitialURL: async () => {
  //   const initialURL = await Linking.getInitialURL();
  //   console.log('getInitialUrl', initialURL);
  // },
  // subscribe: listener => {
  //   console.log('subscribe');
  //   const onReceiveURL = ({url}) => {
  //     console.log('Receive url:', url);
  //     listener(url);
  //   };

  //   // Listen to incoming links from deep linking
  //   Linking.addEventListener('url', onReceiveURL);

  //   return () => {
  //     // Clean up the event listeners
  //     Linking.remove();
  //   };
  // },
};
