import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './screens/signin';
import {navigationRef} from './helpers/navigationRef';
import navigationData from './shared/navigationData';
import Register from './screens/register';
import BoardingPage from './screens/boarding-page';
import WatchList from './screens/watch-list';

const Stack = createNativeStackNavigator();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
