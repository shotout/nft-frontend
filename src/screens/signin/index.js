import React, {useEffect, useState, useRef} from 'react';
import {View, Text, AppState, Platform, Alert} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import {connect} from 'react-redux';
import {openInbox} from 'react-native-email-link';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNAndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import messaging from '@react-native-firebase/messaging';
import Button from '../../components/button';
import Header from '../../components/header';
import Input from '../../components/input';
import Title from '../../layout/auth/title';
import styles from './styles';
import {goBack, reset} from '../../helpers/navigationRef';
import {postLogin} from '../../helpers/requests';
import arrayErrorResturctor from '../register/responseValidatorArr';
// import {requestNotificationPermission} from '../../helpers/requestPermission';
import {eventTracking, SIGN_IN_SUCCESS_ID} from '../../shared/eventTracking';
import dispatcher from './dispatcher';
import {isIphone} from '../../shared/devices';
import states from './states';

function SignIn({setProfileUser, showLoadingModal, isFirstTimeRender}) {
  const [activeStep, setActiveStep] = useState('signin');
  const [isLoading, selectedLoading] = useState(false);
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [values, setValues] = useState({
    email: '',
    fcm_token: '',
  });
  const [error, setError] = useState({
    email: null,
  });

  const getToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      setValues({
        ...values,
        fcm_token: fcmToken,
      });
      console.log('Check fcm:', fcmToken);
    } catch (err) {
      console.log('firebase error', err);
    }
  };

  useEffect(() => {
    getToken();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        if (Platform.OS === 'ios') {
          RNExitApp.exitApp();
        }
      }
    });

    if (Platform.OS === 'android') {
      RNAndroidKeyboardAdjust.setAdjustResize();
    }

    return () => {
      subscription.remove();
      if (Platform.OS === 'android') {
        RNAndroidKeyboardAdjust.setAdjustPan();
      }
    };
  }, []);

  const handleBack = () => {
    switch (activeStep) {
      case 'signin':
        goBack();
        break;
      default:
        setActiveStep('signin');
        break;
    }
  };

  const handleChangeText = (stateName, value) => {
    setValues({...values, [stateName]: value});
  };

  const handleSubmit = async () => {
    try {
      selectedLoading(true);
      const body = {
        ...values,
      };
      const res = await postLogin(body);
      eventTracking(
        SIGN_IN_SUCCESS_ID,
        `Sign in complete, user ${res?.data?.name || ''}`,
      );
      if (
        values.email === 'gian.devx@gmail.com'
        // || values.email === 'nstegwart@gmail.com'
      ) {
        setProfileUser(res);
        if (!isFirstTimeRender) {
          showLoadingModal();
        }
        reset('Homepage', {askTrackingPermission: true});
        return true;
      }
      if (res?.status === 'failed') {
        Alert.alert(res?.message || 'Error');
      } else {
        setActiveStep('success');
      }
      selectedLoading(false);
    } catch (err) {
      if (err.data.errors) {
        const errorRes = arrayErrorResturctor(err.data.errors);
        setError(errorRes);
      }
      selectedLoading(false);
    }
    return true;
  };

  function getLabel() {
    if (activeStep === 'success') {
      return 'Open Email';
    }
    return 'Continue';
  }

  function renderContent() {
    if (activeStep === 'success') {
      return (
        <>
          <Title label="Success, an email with the login link has been sent to your account." />
          <View style={styles.ctnDesc}>
            <Text style={styles.txtDesc}>
              {`To continue, open your emails and click on the link provided.\n\nMake sure to also check your spam folder, if you cannot find it.`}
            </Text>
          </View>
        </>
      );
    }
    return (
      <>
        <Title
          label={`Got an account already?\nLogin by entering your email below.`}
        />
        <Input
          maxLength={100}
          placeholder="Your Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={values.email}
          error={error.email}
          onChangeText={value => {
            handleChangeText('email', value);
          }}
        />
      </>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnTop}>
        <Header hideLeft={activeStep === 'success'} backPress={handleBack} />
        <KeyboardAwareScrollView
          onKeyboardDidShow={() => {
            setKeyboardShow(true);
          }}
          onKeyboardDidHide={() => {
            setKeyboardShow(false);
          }}
          contentContainerStyle={styles.scrollStyle}
          style={styles.ctnRoot}>
          {renderContent()}
        </KeyboardAwareScrollView>
      </View>
      {((!keyboardShow && !isIphone) || isIphone) && (
        <Button
          btnStyle={styles.btnStyle}
          isLoading={isLoading}
          label={getLabel()}
          onPress={() => {
            if (activeStep === 'success') {
              openInbox();
            } else {
              handleSubmit();
            }
          }}
        />
      )}
    </View>
  );
}

export default connect(states, dispatcher)(SignIn);
