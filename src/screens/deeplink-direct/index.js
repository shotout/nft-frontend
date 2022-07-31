import React, {useEffect} from 'react';
import styles from './styles';
import LoadingIndicator from '../../components/loading-indicator';
import {navigate, replace, reset} from '../../helpers/navigationRef';

function DeeplinkDirect({route}) {
  const screenType = route.params.id;

  const handleInitial = async () => {
    switch (screenType) {
      case 'setting':
        reset('Homepage');
        navigate('AccountSettings');
        break;
      case 'register':
        reset('Register', {isWalletConnected: true});
        break;
      default:
        if (route.params.id && route.params.id.includes('article')) {
          const articleID = route.params.id.replace('article', '');
          reset('Homepage');
          navigate('DetailProduct', {
            id: articleID,
          });
        } else {
          reset('BoardingPage');
        }
        break;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleInitial();
    }, 1000);
  }, []);

  return <LoadingIndicator fullscreen stylesRoot={styles.ctnRoot} />;
}

export default DeeplinkDirect;
