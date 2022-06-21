import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import styles from './styles';
import dispatcher from './dispatcher';
import {confirmDeleteUser} from '../../helpers/requests';
import LoadingIndicator from '../../components/loading-indicator';
import {reset} from '../../helpers/navigationRef';

function DeleteAccount({setProfileUser, route}) {
  const [isLoading, setLoading] = useState(true);
  const isConfirm = route.params?.id;

  const handleInitial = async () => {
    await confirmDeleteUser(isConfirm);
    reset('BoardingPage');
    setProfileUser('reset');
  };

  useEffect(() => {
    handleInitial();
  }, []);

  return <LoadingIndicator fullscreen stylesRoot={styles.ctnRoot} />;
}

export default connect(null, dispatcher)(DeleteAccount);
