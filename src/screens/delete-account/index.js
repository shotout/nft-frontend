import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import styles from './styles';
import dispatcher from './dispatcher';
import {confirmDeleteUser} from '../../helpers/requests';
import LoadingIndicator from '../../components/loading-indicator';
import {reset} from '../../helpers/navigationRef';

function DeleteAccount({setProfileUser, route, setCounterNumber}) {
  const isConfirm = route.params?.id;

  const handleInitial = async () => {
    reset('BoardingPage');
    setCounterNumber(90);
    confirmDeleteUser(isConfirm);
    setProfileUser('reset');
  };

  useEffect(() => {
    setTimeout(() => {
      handleInitial();
    }, 1000);
  }, []);

  return <LoadingIndicator fullscreen stylesRoot={styles.ctnRoot} />;
}

export default connect(null, dispatcher)(DeleteAccount);
