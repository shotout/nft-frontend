/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import notifee from '@notifee/react-native';
import {Alert, AppState} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import SignIn from './screens/signin';
import {navigationRef} from './helpers/navigationRef';
import navigationData from './shared/navigationData';
import Register from './screens/register';
import BoardingPage from './screens/boarding-page';
import WatchList from './screens/watch-list';
import AccountSettings from './screens/account-settings';
import FAQ from './screens/faq';
import SafetyGuideline from './screens/safety-guideline';
import DiscoverNFT from './screens/discover-nft';
import Sidebar from './components/sidebar';
import {
  fetchWallet,
  setProfileUser,
  setAppVersion,
  setAppStatus,
} from './store/defaultState/actions';
import {
  userCredentialSelector,
  appVersion,
} from './store/defaultState/selector';
import ValidateToken from './screens/validate-token';
import {linking} from './helpers/linking';
import DetailProduct from './screens/detail-product';
import ActivateNotification from './screens/activate-notification';
import {isIphone} from './shared/devices';
import {getVersionApps} from './helpers/requests';
import {IOS_APP_VERSION, ANDROID_APP_VERSION} from './shared/constant';
import ConfirmDelete from './screens/confirm-delete';
import DeleteAccount from './screens/delete-account';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function Homepage({route}) {
  return (
    <Drawer.Navigator drawerContent={props => <Sidebar {...props} />}>
      <Drawer.Screen
        options={navigationData.noHeader.options}
        name="DiscoverNFT"
        component={DiscoverNFT}
        initialParams={{
          askTrackingPermission: route.params?.askTrackingPermission,
        }}
      />
    </Drawer.Navigator>
  );
}

function Routes({
  handleFetchWallet,
  profile,
  getAppVersion,
  handleProfilUser,
  handleAppVersion,
  isDeleteUser,
  setStagingMode,
}) {
  const currentAppVersion = isIphone ? IOS_APP_VERSION : ANDROID_APP_VERSION;
  const appState = useRef(AppState.currentState);

  const getSetting = async () => {
    const version = await getVersionApps({
      app_version: currentAppVersion,
    });
    setStagingMode(version.data.status === 0);
  };

  const resetNotificationBadge = () => {
    if (isIphone) {
      notifee.setBadgeCount(0).then(() => console.log('Badge count set to 0!'));
    }
  };

  const handleInitialData = () => {
    handleFetchWallet();
    resetNotificationBadge();
    if (getAppVersion !== currentAppVersion) {
      handleProfilUser(null);
      handleAppVersion(currentAppVersion);
    }
    if (!profile.token) {
      getSetting();
    }
  };

  useEffect(() => {
    handleInitialData();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match('background') && nextAppState === 'active') {
        resetNotificationBadge();
      }

      appState.current = nextAppState;
    });

    messaging().onMessage(async remoteMessage => {
      notifee.incrementBadgeCount();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        if (isDeleteUser) {
          RNExitApp.exitApp();
        }
      }
    });
    if (!isDeleteUser) {
      subscription.remove();
    }
    return () => {
      if (typeof subscription.remove === 'function') {
        subscription.remove();
      }
    };
  }, [isDeleteUser]);

  function getInitialRoute() {
    if (profile.token) {
      return 'Homepage';
    }
    return 'BoardingPage';
  }

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Stack.Navigator initialRouteName={getInitialRoute()}>
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="BoardingPage"
          component={BoardingPage}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="Signin"
          component={SignIn}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="Watchlist"
          component={WatchList}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="AccountSettings"
          component={AccountSettings}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="FAQ"
          component={FAQ}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="SafetyGuideline"
          component={SafetyGuideline}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="Homepage"
          component={Homepage}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="ValidateToken"
          component={ValidateToken}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="DetailProduct"
          component={DetailProduct}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="ActivateNotification"
          component={ActivateNotification}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="DeleteConfirmation"
          component={ConfirmDelete}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="DeleteAccount"
          component={DeleteAccount}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = state => ({
  profile: userCredentialSelector(state),
  getAppVersion: appVersion(state),
  isDeleteUser: state.defaultState.isDeleteUser,
});

export default connect(mapStateToProps, {
  handleFetchWallet: fetchWallet,
  handleProfilUser: setProfileUser,
  handleAppVersion: setAppVersion,
  setStagingMode: setAppStatus,
})(Routes);
