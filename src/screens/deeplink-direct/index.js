import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import styles from './styles';
import LoadingIndicator from '../../components/loading-indicator';
import {navigate, reset} from '../../helpers/navigationRef';
import dispatcher from './dispatcher';

function DeeplinkDirect({route, setCounterNumber, showLoadingModal}) {
  const screenType = route.params.id;

  const handleInitial = async () => {
    showLoadingModal();
    setTimeout(() => {
      setCounterNumber(96);
    }, 3000);
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
    handleInitial();
  }, []);

  return <LoadingIndicator fullscreen stylesRoot={styles.ctnRoot} />;
}

export default connect(undefined, dispatcher)(DeeplinkDirect);
