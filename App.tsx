import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { ActivityIndicator, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';


import { 
  useFonts, 
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';

import { 
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

import theme from './src/styles/theme';
import { MyStack } from './routes';
import {Home} from './src/screens/Home';
import { AppStackRoutes} from './src/routes/app.stack.routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  if(!fontsLoaded) {
    return <ActivityIndicator />
  }
  return (
   <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          translucent
        />
       <NavigationContainer>
        <AppStackRoutes />
      </NavigationContainer>
    </ThemeProvider>

   </GestureHandlerRootView>
  )
}
