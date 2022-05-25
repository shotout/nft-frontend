import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import Button from '../../components/button';
import FomoComponent from '../../components/fomo-component';
import {reset} from '../../helpers/navigationRef';
import {askTrackingPermission} from '../../shared/eventTracking';

import styles from './styles';

function ActivateNotification() {
  const activateNotification = () => {
    requestNotifications(['alert', 'sound', 'badge']).then(
      ({status, settings}) => {
        if (status === 'granted') {
          askTrackingPermission();
          reset('Homepage');
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
          askTrackingPermission();
          reset('Homepage');
        }}>
        <Text style={styles.txtNothanks}>No thanks</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ActivateNotification;
