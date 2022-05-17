import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  AppState,
  Platform,
  Alert,
} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import Button from '../../components/button';
import Header from '../../components/header';
import Input from '../../components/input';
import Title from '../../layout/auth/title';
import styles from './styles';
import {colors} from '../../shared/styling';
import {goBack} from '../../helpers/navigationRef';
import states from './states';
import {getProfile, postRegister, updateUser} from '../../helpers/requests';
import arrayErrorResturctor from './responseValidatorArr';
import LoadingIndicator from '../../components/loading-indicator';
import {requestNotificationPermission} from '../../helpers/requestPermission';

function Register({walletList, route}) {
  const [activeStep, setActiveStep] = useState('username'); // email,wallet
  const [selectedWallet, setSelectedWallet] = useState([]);
  const [isLoading, selectedLoading] = useState(false);
  const [isNone, setNone] = useState(false);
  const [loadingGetEdit, setEditLoading] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [values, setValues] = useState({
    name: '',
    email: '',
    fcm_token: '',
  });
  const [error, setError] = useState({
    name: null,
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

  const handleInitialEdit = async () => {
    if (route.params?.edit) {
      setEditLoading(true);
      setActiveStep(route.params?.edit);
      const res = await getProfile();
      const wallet = res.data.wallets.map(item => item.uuid);
      setValues({
        ...values,
        name: res.data.name,
        email: res.data.email,
      });
      setSelectedWallet(wallet);
      setEditLoading(false);
    }
  };

  useEffect(() => {
    requestNotificationPermission();
    handleInitialEdit();
    getToken();
  }, []);

  useEffect(() => {
    console.log('Active step change', activeStep);
    if (activeStep === 'done') {
      setTimeout(() => {
        console.log('Exit apps', activeStep);
        RNExitApp.exitApp();
      }, 5000);
      // const subscription = AppState.addEventListener('change', nextAppState => {
      //   if (
      //     appState.current.match(/inactive|background/) &&
      //     nextAppState === 'active'
      //   ) {
      //     console.log('App has come to the foreground!');
      //   }

      //   appState.current = nextAppState;
      //   setAppStateVisible(appState.current);

      //   console.log('AppState', appState.current, activeStep);
      //   if (nextAppState === 'inactive' || nextAppState === 'background') {
      //     if (Platform.OS === 'ios') {
      //       console.log('Exit apps', activeStep);
      //       RNExitApp.exitApp();
      //     }
      //   }
      // });

      // return () => {
      //   subscription.remove();
      // };
    }
  }, [activeStep]);

  const handleChangeText = (stateName, value) => {
    setValues({...values, [stateName]: value});
  };

  const findSelectedWallet = name => {
    const isThere = selectedWallet.find(item => item === name);
    if (isThere) {
      return true;
    }
    return false;
  };

  const handleBack = () => {
    if (route.params?.edit) {
      goBack();
      return true;
    }
    switch (activeStep) {
      case 'username':
        goBack();
        break;
      case 'wallet':
        setActiveStep('username');
        break;
      case 'email':
        setActiveStep('wallet');
        break;
      case 'done':
        break;
      default:
        break;
    }
    return true;
  };

  const handleSelectedWallet = name => {
    const isThere = findSelectedWallet(name);
    if (isNone) {
      setNone(false);
    }
    if (isThere) {
      setSelectedWallet(selectedWallet.filter(item => item !== name));
    } else {
      const currrentData = [...selectedWallet];
      currrentData.push(name);
      setSelectedWallet(currrentData);
    }
  };

  const handleSubmit = async () => {
    try {
      selectedLoading(true);
      const body = {
        ...values,
        wallet: selectedWallet,
      };
      const res = await postRegister(body);
      if (res?.status === 'failed') {
        Alert.alert(res?.message || 'Error');
      } else {
        setActiveStep('done');
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

  const handleUpdate = async () => {
    try {
      selectedLoading(true);
      const body = {
        ...values,
        wallet: selectedWallet,
      };
      await updateUser(body);
      selectedLoading(false);
      goBack();
    } catch (err) {
      if (err.data.errors) {
        const errorRes = arrayErrorResturctor(err.data.errors);
        setError(errorRes);
      }
      selectedLoading(false);
    }
  };

  function getLabel() {
    if (route.params?.edit) {
      return 'Save';
    }
    if (activeStep === 'done') {
      return 'Go Back';
    }
    return 'Continue';
  }

  const handleChangeStep = () => {
    if (route.params?.edit) {
      handleUpdate();
      return true;
    }
    switch (activeStep) {
      case 'username':
        if (values.name) {
          setActiveStep('wallet');
          setError({
            ...error,
            name: null,
          });
        } else {
          setError({
            ...error,
            name: 'Username is required.',
          });
        }
        break;
      case 'wallet':
        setActiveStep('email');
        break;
      case 'email':
        if (values.email) {
          handleSubmit();
          setError({
            ...error,
            email: null,
          });
        } else {
          setError({
            ...error,
            email: 'Please enter a valid email address.',
          });
        }
        break;
      case 'done':
        goBack();
        break;
      default:
        break;
    }
    return true;
  };

  function renderContent() {
    if (activeStep === 'done') {
      return (
        <>
          <Title label="Success, an email with the register link has been sent to your account." />
          <View style={styles.ctnDescDone}>
            <Text style={styles.txtDescDone}>
              {`To continue, open your emails and click on the link provided.\n\nMake sure to also check your spam folder, if you cannot find it.`}
            </Text>
          </View>
        </>
      );
    }
    if (activeStep === 'email') {
      return (
        <>
          <Title
            label={`Almost done,\nlet's get you the hottest picks directly into your inbox.`}
          />
          <Input
            maxLength={100}
            value={values.email}
            onChangeText={value => {
              handleChangeText('email', value);
            }}
            placeholder="Your Email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={error.email}
          />
        </>
      );
    }
    if (activeStep === 'wallet') {
      return (
        <>
          <Title label="Make it relevant for you! Select your primary wallets." />
          <View style={styles.cntWallet}>
            {walletList.map(wallet => {
              const isWalletSelected = findSelectedWallet(wallet.uuid);
              return (
                <View style={styles.ctnWallet} key={wallet.uuid}>
                  <TouchableOpacity
                    onPress={() => {
                      handleSelectedWallet(wallet.uuid);
                    }}>
                    <View
                      style={[
                        styles.icnWallet,
                        isWalletSelected && styles.redBorder,
                      ]}>
                      <Image
                        source={{uri: wallet.image_url}}
                        style={styles.walletIcoStyle}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.txtWallet}>{wallet.name}</Text>
                </View>
              );
            })}
            <View style={styles.ctnWallet}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedWallet([]);
                  setNone(true);
                }}>
                <View style={[styles.icnWallet, isNone && styles.redBorder]}>
                  <AntDesign name="close" size={30} color={colors.dark} />
                </View>
              </TouchableOpacity>
              <Text style={styles.txtWallet}>None</Text>
            </View>
          </View>
        </>
      );
    }
    return (
      <>
        <Title label="Lets get personal, what should we call you?" />
        <Input
          value={values.name}
          onChangeText={value => {
            handleChangeText('name', value);
          }}
          maxLength={30}
          placeholder="Your name"
          error={error.name}
        />
      </>
    );
  }

  function renderMainContent() {
    if (loadingGetEdit) {
      return <LoadingIndicator fullscreen />;
    }
    return <ScrollView style={styles.ctnRoot}>{renderContent()}</ScrollView>;
  }

  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnTop}>
        <Header hideLeft={activeStep === 'done'} backPress={handleBack} />
        {renderMainContent()}
      </View>
      {!loadingGetEdit && (
        <Button
          isLoading={isLoading}
          label={getLabel()}
          onPress={handleChangeStep}
          btnStyle={styles.btnStyle}
        />
      )}
    </View>
  );
}

export default connect(states)(Register);
