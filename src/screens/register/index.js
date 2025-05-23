import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AppState,
  Linking,
  Alert,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNAndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import {moderateScale} from 'react-native-size-matters';
import RNExitApp from 'react-native-exit-app';
import Button from '../../components/button';
import Header from '../../components/header';
import Input from '../../components/input';
import Title from '../../layout/auth/title';
import styles from './styles';
import {colors} from '../../shared/styling';
import {goBack, reset} from '../../helpers/navigationRef';
import states from './states';
import {
  getProfile,
  getSkipResult,
  postRegister,
  updateUser,
} from '../../helpers/requests';
import arrayErrorResturctor from './responseValidatorArr';
import LoadingIndicator from '../../components/loading-indicator';
import RegisterAnimate from '../../components/register-animate';
import dispatcher from './dispatcher';
import FomoComponent from '../../components/fomo-component';
import {isIphone} from '../../shared/devices';
import {
  eventTracking,
  SELECT_WALLET_ID,
  SIGN_UP_SUCCESS_ID,
  UNSELECT_WALLET_ID,
} from '../../shared/eventTracking';

const androidProgress1 = require('../../assets/icon/progress_bar/android/progress_step_1.png');
const androidProgress2 = require('../../assets/icon/progress_bar/android/progress_step_2.png');
const androidProgress3 = require('../../assets/icon/progress_bar/android/progress_step_3.png');

const iPhoneProgress1 = require('../../assets/icon/progress_bar/ios/progress_step_1.png');
const iPhoneProgress2 = require('../../assets/icon/progress_bar/ios/progress_step_2.png');
const iPhoneProgress3 = require('../../assets/icon/progress_bar/ios/progress_step_3.png');
const iPhoneProgress4 = require('../../assets/icon/progress_bar/ios/progress_step_4.png');

function Register({
  walletList,
  route,
  setProfileUser,
  userProfile,
  showSkipButton,
  showLoadingModal,
  isFirstTimeRender,
}) {
  const [activeStep, setActiveStep] = useState('username'); // email,wallet
  const [selectedWallet, setSelectedWallet] = useState([]);
  const [isLoading, selectedLoading] = useState(false);
  const [loadingGetEdit, setEditLoading] = useState(false);
  const [keyboardShow, setKeyboardShow] = useState(false);
  const appState = useRef(AppState.currentState);
  const [values, setValues] = useState({
    name: '',
    email: '',
    fcm_token: '',
    email_subscribe: false,
  });
  const [error, setError] = useState({
    name: null,
    email: null,
  });
  const [notificationStatus, setNotificationStatus] = useState('');
  const noneId = '6S9k8lpoFy7M6heCsMElgD';
  console.log('Check showSkipButton:', showSkipButton);
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
        email: route.params?.isGuest ? '' : res.data.email,
        email_subscribe: res.data.email_subscribe,
      });
      setSelectedWallet(wallet);
      setEditLoading(false);
    }
  };

  useEffect(() => {
    handleInitialEdit();
    getToken();
    checkNotifications().then(({status, settings}) => {
      setNotificationStatus(status);
    });
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
      if (Platform.OS === 'android') {
        RNAndroidKeyboardAdjust.setAdjustPan();
      }
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    // if (activeStep === 'done') {
    //   if (Platform.OS === 'ios') {
    //     setTimeout(() => {
    //       console.log('Exit apps', activeStep);
    //       RNExitApp.exitApp();
    //     }, 5000);
    //   }
    // }
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
    // }
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

  const getDisable = () => {
    if (activeStep === 'wallet') {
      if (selectedWallet.length === 0) {
        return true;
      }
    }
    if (activeStep === 'username') {
      if (values.name.length === 0) {
        return true;
      }
    }
    if (activeStep === 'email') {
      if (values.email.length === 0) {
        return true;
      }
    }
    return false;
  };

  function isDisableItem(id) {
    const isNoneSelected = selectedWallet.find(wallet => wallet === noneId);
    if (isNoneSelected && noneId !== id) {
      return true;
    }
    return false;
  }

  const handleSelectedWallet = (name, walletName) => {
    const isThere = findSelectedWallet(name);
    if (isThere) {
      setSelectedWallet(selectedWallet.filter(item => item !== name));
      eventTracking(UNSELECT_WALLET_ID, `Wallet: unselect ${walletName || ''}`);
    } else if (noneId === name) {
      setSelectedWallet([name]);
    } else {
      const currrentData = [...selectedWallet];
      currrentData.push(name);
      setSelectedWallet(currrentData.filter(ctn => ctn !== noneId));
      eventTracking(SELECT_WALLET_ID, `Wallet: select ${walletName || ''}`);
    }
  };

  const handleSubmit = async isSkip => {
    console.log('IS SKIP:', isSkip);
    try {
      selectedLoading(true);
      const body = {
        ...values,
        email: isSkip ? `guest${Date.now()}@mail.com` : values.email,
        wallet: selectedWallet,
      };
      const res = await postRegister(body);
      eventTracking(
        SIGN_UP_SUCCESS_ID,
        `Sign up complete, user ${res?.data?.name || ''}`,
      );
      if (res?.status === 'failed') {
        Alert.alert(res?.message || 'Error');
      } else {
        setProfileUser(res);
        if (isIphone && notificationStatus !== 'granted') {
          setActiveStep('notification');
        } else {
          setActiveStep('done');
        }
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
        name: values.name,
        email: values.email,
        email_subscribe: values.email_subscribe,
        wallet: selectedWallet,
      };
      const user = await updateUser(body);
      setProfileUser({
        ...userProfile,
        ...user,
      });
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
      return 'Start Exploring';
    }
    if (activeStep === 'notification') {
      return 'ENABLE NOTIFICATIONS';
    }
    return 'Continue';
  }

  const handleChangeStep = (skip = false) => {
    if (route.params?.edit) {
      handleUpdate();
      return true;
    }
    switch (activeStep) {
      case 'username':
        if (values.name || skip) {
          if (skip) {
            handleChangeText('name', 'Guest');
          }
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
        if (selectedWallet.length === 0 && !skip) {
          Alert.alert('Wallet must be selected.');
        } else {
          if (skip) {
            setSelectedWallet([noneId]);
          }
          setActiveStep('email');
        }
        break;
      case 'email':
        if (values.email || skip) {
          console.log('Check submit skip :', skip);
          handleSubmit(skip);
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
      case 'notification':
        requestNotifications(['alert', 'sound', 'badge']).then(
          ({status, settings}) => {
            if (status === 'granted') {
              setActiveStep('done');
            } else {
              Linking.openSettings();
            }
            console.log('Check status:', status);
          },
        );
        break;
      case 'done':
        if (!isFirstTimeRender) {
          showLoadingModal();
        }
        reset('Homepage', {askTrackingPermission: true});
        break;
      default:
        break;
    }
    return true;
  };

  function getProgressImage() {
    if (isIphone) {
      switch (activeStep) {
        case 'wallet':
          return iPhoneProgress2;
        case 'email':
          return iPhoneProgress3;
        case 'notification':
          return iPhoneProgress4;
        default:
          return iPhoneProgress1;
      }
    } else {
      switch (activeStep) {
        case 'wallet':
          return androidProgress2;
        case 'email':
          return androidProgress3;
        default:
          return androidProgress1;
      }
    }
  }

  function renderProgress() {
    if (activeStep === 'done' || route.params?.edit) {
      return null;
    }
    return (
      <View style={styles.ctnProgress}>
        <Image source={getProgressImage()} style={styles.progressStyle} />
      </View>
    );
  }

  function renderContent() {
    if (activeStep === 'done') {
      return (
        <>
          <View style={styles.ctnBanner}>
            <RegisterAnimate />
          </View>
          <Title label="All done!" />
          <View style={styles.ctnDesc}>
            <Text style={styles.txtDesc}>
              {`Discover one new exclusively selected NFT project each day.\n\nVetted and guaranteed to be interesting.`}
            </Text>
          </View>
        </>
      );
    }

    if (activeStep === 'notification') {
      return <FomoComponent ctnStyle={{paddingTop: moderateScale(20)}} />;
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
            error={
              route.params?.edit === 'email' && !values.email.length
                ? 'Please enter your Email'
                : error.email
            }
          />
          <View style={styles.ctnReceiveEmail}>
            <TouchableOpacity
              onPress={() => {
                handleChangeText('email_subscribe', !values.email_subscribe);
              }}>
              <View style={styles.ctnCheckbox}>
                {values.email_subscribe && (
                  <Fontisto
                    name="close-a"
                    color={colors.dark}
                    size={moderateScale(12)}
                  />
                )}
              </View>
            </TouchableOpacity>
            <TouchableWithoutFeedback
              onPress={() => {
                handleChangeText('email_subscribe', !values.email_subscribe);
              }}>
              <View style={styles.ctnTextEmail}>
                <Text style={styles.txtEmail}>
                  I want to receive the latest picks & updates via email.
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
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
              const isItemDisable = isDisableItem(wallet.uuid);
              return (
                <View style={styles.ctnWallet} key={wallet.uuid}>
                  <TouchableOpacity
                    // disabled={isItemDisable}
                    onPress={() => {
                      handleSelectedWallet(wallet.uuid, wallet.name);
                    }}>
                    <View
                      style={[
                        styles.icnWallet,
                        isWalletSelected && styles.redBorder,
                        // isItemDisable && styles.disableBg,
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
            {/* <View style={styles.ctnWallet}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedWallet([]);
                  setNone(true);
                }}>
                <View style={[styles.icnWallet, isNone && styles.redBorder]}>
                  <Fontisto name="close" size={30} color={colors.dark} />
                </View>
              </TouchableOpacity>
              <Text style={styles.txtWallet}>None</Text>
            </View> */}
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
          error={
            route.params?.edit === 'username' && !values.name.length
              ? 'Please enter your name'
              : error.name
          }
        />
      </>
    );
  }

  function renderMainContent() {
    if (loadingGetEdit) {
      return <LoadingIndicator fullscreen />;
    }
    return (
      <KeyboardAwareScrollView
        onKeyboardDidShow={() => {
          setKeyboardShow(true);
        }}
        onKeyboardDidHide={() => {
          setKeyboardShow(false);
        }}
        contentContainerStyle={styles.scrollStyle}
        style={styles.ctnRoot}>
        {renderProgress()}
        {renderContent()}
      </KeyboardAwareScrollView>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnTop}>
        <Header
          type={
            activeStep === 'done' ||
            route.params?.edit ||
            activeStep === 'notification'
              ? undefined
              : showSkipButton
              ? 'skip-right-text'
              : null
          }
          hideLeft={activeStep === 'done' || activeStep === 'notification'}
          backPress={handleBack}
          onSkip={() => {
            handleChangeStep(true);
          }}
        />
        {renderMainContent()}
      </View>
      {!loadingGetEdit && ((!keyboardShow && !isIphone) || isIphone) && (
        <Button
          isLoading={isLoading}
          label={getLabel()}
          onPress={() => {
            handleChangeStep(false);
          }}
          isDisable={getDisable()}
          btnStyle={
            activeStep === 'notification' ? styles.pdBtmNormal : styles.btnStyle
          }
        />
      )}
      {activeStep === 'notification' && (
        <TouchableOpacity
          style={styles.btnNoThanks}
          onPress={() => {
            setActiveStep('done');
          }}>
          <Text style={styles.txtNothanks}>No thanks</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default connect(states, dispatcher)(Register);
