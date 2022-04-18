import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
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

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function Homepage() {
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

export default function Routes() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="BoardingPage">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
