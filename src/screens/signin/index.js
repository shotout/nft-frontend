import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, AppState, Platform, Alert} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import Button from '../../components/button';
import Header from '../../components/header';
import Input from '../../components/input';
import Title from '../../layout/auth/title';
import styles from './styles';
import {goBack} from '../../helpers/navigationRef';
import {postLogin} from '../../helpers/requests';
import arrayErrorResturctor from '../register/responseValidatorArr';
// import {requestNotificationPermission} from '../../helpers/requestPermission';
import {eventTracking, SIGN_IN_SUCCESS_ID} from '../../shared/eventTracking';

export default function SignIn() {
  const [activeStep, setActiveStep] = useState('signin');
  const [isLoading, selectedLoading] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [values, setValues] = useState({
    email: '',
  });
  const [error, setError] = useState({
    email: null,
  });

  // useEffect(() => {
  //   requestNotificationPermission();
  // }, []);

  useEffect(() => {
    // if (activeStep === 'success') {
    //   if (Platform.OS === 'ios') {
    //     setTimeout(() => {
    //       console.log('Exit apps', activeStep);
    //       RNExitApp.exitApp();
    //     }, 5000);
    //   }
    // }
    if (activeStep === 'success') {
      const subscription = AppState.addEventListener('change', nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);

        // console.log('AppState', appState.current, activeStep);
        if (nextAppState === 'inactive' || nextAppState === 'background') {
          if (Platform.OS === 'ios') {
            console.log('Exit apps', activeStep);
            RNExitApp.exitApp();
          }
        }
      });

      return () => {
        subscription.remove();
      };
    }
  }, [activeStep]);

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
      console.log('Res data:', res);
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
  };

  function getLabel() {
    if (activeStep === 'success') {
      return 'Go Back';
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
        <ScrollView style={styles.ctnRoot}>{renderContent()}</ScrollView>
      </View>
      {activeStep !== 'success' && (
        <Button
          btnStyle={styles.btnStyle}
          isLoading={isLoading}
          label={getLabel()}
          onPress={() => {
            if (activeStep === 'success') {
              goBack();
            } else {
              handleSubmit();
            }
          }}
        />
      )}
    </View>
  );
}
