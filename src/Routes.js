import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './screens/signin';
import {navigationRef} from './helpers/navigationRef';
import navigationData from './shared/navigationData';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="Signin"
          component={SignIn}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
