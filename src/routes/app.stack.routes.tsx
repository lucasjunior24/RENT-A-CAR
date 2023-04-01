
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
// import { Scheduling } from '../screens/Scheduling';
// import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';

const { Screen, Navigator } = createNativeStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
      <Screen
        name='Home'
        component={Home}
      />
      <Screen
        name='CarDetails'
        component={CarDetails}
      />
      <Screen
        name='SignUpSecondStep'
        component={SignUpSecondStep}
      />
      {/* <Screen
        name='SchedulingDetails'
        component={SchedulingDetails}
      /> */}
      <Screen
        name='Confirmation'
        component={Confirmation}
      />
      <Screen
        name='MyCars'
        component={MyCars}
      />
    </Navigator>
  );
}


// export type RootStackParamList = {
//   Home: undefined;
//   CarDetails: { car: CarDTO };
//   Confirmation: undefined;
//   MyCars: undefined;
//   SignUpSecondStep : undefined;
// };

// export type PropsStack = NativeStackScreenProps<RootStackParamList>