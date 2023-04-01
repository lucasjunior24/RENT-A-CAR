import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { Confirmation } from '../screens/Confirmation';
import { SignIn } from '../screens/SignIn';
import { Splash } from '../screens/Splash';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';

const { Screen, Navigator } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator initialRouteName='Splash' >
      <Screen
        name='Splash'
        component={Splash}
      />
      <Screen
        name='SignIn'
        component={SignIn}
      />
      <Screen
        name='SignUpSecondStep'
        component={SignUpSecondStep}
      />
      <Screen
        name='SignUpFirstStep'
        component={SignUpFirstStep}
      />
      <Screen
        name='Confirmation'
        component={Confirmation}
      />
    </Navigator>
  );
}