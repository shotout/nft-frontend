import React, {useEffect, useState} from 'react';
import {View, Text, AppState, Platform} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import {connect} from 'react-redux';
import {openInbox} from 'react-native-email-link';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/button';
import Header from '../../components/header';
import Title from '../../layout/auth/title';
import styles from './styles';
import dispatcher from './dispatcher';
import {deleteUser} from '../../helpers/requests';
import LoadingIndicator from '../../components/loading-indicator';
import {colors} from '../../shared/styling';

function ConfirmDelete({setProfileUser, route}) {
  const [isLoading, setLoading] = useState(true);

  const handleInitial = async () => {
    try {
      await deleteUser();
      setLoading(false);
    } catch (err) {
      console.log('Err initial', err);
      // reset('BoardingPage');
    }
  };

  useEffect(() => {
    handleInitial();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        if (Platform.OS === 'ios') {
          RNExitApp.exitApp();
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (isLoading) {
    return (
      <LoadingIndicator
        fullscreen
        stylesRoot={{backgroundColor: colors.white}}
      />
    );
  }
  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnTop}>
        <Header />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollStyle}
          style={styles.ctnRoot}>
          <Title label="Sad to see you go, confirm that you want to delete the account by clicking the link we sent to you." />
          <View style={styles.ctnDesc}>
            <Text style={styles.txtDesc}>
              To continue, open your emails and click on the link provided.
            </Text>
            <Text style={styles.txtDesc}>
              Make sure to also check your spam folder, if you cannot find it.
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <Button
        btnStyle={styles.btnStyle}
        isLoading={isLoading}
        label="Open Email"
        onPress={() => {
          openInbox();
        }}
      />
    </View>
  );
}

export default connect(null, dispatcher)(ConfirmDelete);
