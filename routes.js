import * as React from 'react';
import { Button, Text } from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import { Home } from './src/screens/Home/index'
import Home from './src/screens/Home'; 
const { Navigator, Screen }  = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home} />    
        <Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Screen name="Profile" component={ProfileScreen} />
      </Navigator>
    </NavigationContainer>
  );
};
const HomeScreen = ({navigation}) => {
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Profile', {name: 'Jane'})
        }
      />
    );
  };
  const ProfileScreen = ({navigation, route}) => {
    return <Text>This is {route.params.name}'s profile</Text>;
  };

  export { HomeScreen, ProfileScreen, MyStack }