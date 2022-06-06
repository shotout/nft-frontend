/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
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
} from './store/defaultState/actions';
import {
  userCredentialSelector,
  appVersion,
} from './store/defaultState/selector';
import ValidateToken from './screens/validate-token';
import {linking} from './helpers/linking';
import DetailProduct from './screens/detail-product';
import {appWokeUp} from './helpers/userInit';
import ActivateNotification from './screens/activate-notification';
import {isIphone} from './shared/devices';
import {getSkipResult, getVersionApps} from './helpers/requests';
import {APP_VERSION} from './shared/constant';
import LoadingIndicator from './components/loading-indicator';

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
          isStaging: route.params?.isStaging,
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
}) {
  const [setting, setSetting] = useState({});
  const [isStaging, setStagingMode] = useState(false);
  const [isLoading, setLoader] = useState(true);

  const getSetting = async () => {
    const res = await getSkipResult();
    const version = await getVersionApps({
      app_version: APP_VERSION,
    });
    setStagingMode(version.data.status === 0);
    setSetting(res.data[0]);
    setLoader(false);
  };

  const handleAddBadgeNotification = count => {
    console.log('ADD BADGE NUMBER:', count + 1);
    PushNotificationIOS.setApplicationIconBadgeNumber(count + 1);
  };

  const onRemoteNotification = () => {
    PushNotificationIOS.getApplicationIconBadgeNumber(
      handleAddBadgeNotification,
    );
  };

  const handleInitialData = () => {
    handleFetchWallet();
    getSetting();
    if (getAppVersion === APP_VERSION) {
      if (isIphone) {
        PushNotificationIOS.setApplicationIconBadgeNumber(0);
        // PushNotificationIOS.addEventListener(
        //   'notification',
        //   onRemoteNotification,
        // );
        // return () => {
        //   PushNotificationIOS.removeEventListener('notification');
        // };
      }
    } else {
      handleProfilUser(null);
      handleAppVersion(APP_VERSION);
    }
  };

  useEffect(() => {
    handleInitialData();
  }, []);

  function getInitialRoute() {
    if (profile.token) {
      return 'Homepage';
    }
    return 'BoardingPage';
  }

  console.log('Check getAppVersion:', getAppVersion);

  if (isLoading) {
    return <LoadingIndicator fullscreen />;
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
          initialParams={{showSkipButton: isStaging}}
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
          initialParams={{isStaging}}
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
          initialParams={{showMint: !isStaging}}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="ActivateNotification"
          component={ActivateNotification}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = state => ({
  profile: userCredentialSelector(state),
  getAppVersion: appVersion(state),
});

export default connect(mapStateToProps, {
  handleFetchWallet: fetchWallet,
  handleProfilUser: setProfileUser,
  handleAppVersion: setAppVersion,
})(Routes);
