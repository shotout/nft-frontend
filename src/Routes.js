import React, {useEffect} from 'react';
import {Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {connect} from 'react-redux';
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

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

export const config = {
  screens: {
    ValidateToken: {
      path: 'api/v1/auth/verify/:id',
      parse: {
        id: id => `${id}`,
      },
    },
  },
};

const linking = {
  prefixes: ['https://backend.nftdaily.app', 'nftapps://link'],
  // prefixes: ['nftapps://link'],
  config,
};

function Homepage({route}) {
  return (
    <Drawer.Navigator drawerContent={props => <Sidebar {...props} />}>
      <Drawer.Screen
        options={navigationData.noHeader.options}
        name="DiscoverNFT"
        component={DiscoverNFT}
      />
    </Drawer.Navigator>
  );
}

function Routes({handleFetchWallet, profile}) {
  useEffect(() => {
    handleFetchWallet();
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
