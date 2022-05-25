/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect} from 'react';
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
import {fetchWallet} from './store/defaultState/actions';
import {userCredentialSelector} from './store/defaultState/selector';
import ValidateToken from './screens/validate-token';
import {linking} from './helpers/linking';
import DetailProduct from './screens/detail-product';
import {appWokeUp} from './helpers/userInit';
import ActivateNotification from './screens/activate-notification';
import {isIphone} from './shared/devices';

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

function Routes({handleFetchWallet, profile}) {
  useEffect(() => {
    handleFetchWallet();

    if (isIphone) {
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
      console.log('SET BADGE');
    }
    // const subscription = Linking.addEventListener('url', appWokeUp);
    // return () => subscription.remove();
  }, []);

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = state => ({
  profile: userCredentialSelector(state),
});

export default connect(mapStateToProps, {
  handleFetchWallet: fetchWallet,
})(Routes);
