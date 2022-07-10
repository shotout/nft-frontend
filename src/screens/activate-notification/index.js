import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {connect} from 'react-redux';
import Button from '../../components/button';
import FomoComponent from '../../components/fomo-component';
import {popToTop, reset} from '../../helpers/navigationRef';
import dispatcher from './dispatcher';
import states from './states';

import styles from './styles';

function ActivateNotification({route, showLoadingModal, isFirstTimeRender}) {
  const handleToHome = () => {
    if (route.params?.justBack) {
      popToTop();
    } else {
      reset('Homepage', {askTrackingPermission: true});
      if (!isFirstTimeRender) {
        showLoadingModal();
      }
    }
  };

  const activateNotification = () => {
    requestNotifications(['alert', 'sound', 'badge']).then(
      ({status, settings}) => {
        console.log('Check status:', status);
        if (status === 'granted') {
          handleToHome();
        } else {
          Linking.openSettings();
        }
        console.log('Check status:', status);
      },
    );
  };

  return (
    <View style={styles.ctnRoot}>
      <FomoComponent />
      <Button
        onPress={activateNotification}
        btnStyle={styles.pdBnmNotification}
        label="ENABLE NOTIFICATIONS"
      />
      <TouchableOpacity
        style={styles.btnNoThanks}
        onPress={() => {
          handleToHome();
        }}>
        <Text style={styles.txtNothanks}>No thanks</Text>
      </TouchableOpacity>
    </View>
  );
}

export default connect(states, dispatcher)(ActivateNotification);
