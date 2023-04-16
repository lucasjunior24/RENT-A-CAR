import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
// import { useAuth } from '../hooks/auth';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';
import { useAuth } from '../hooks/useAuth';

export function Routes() {
  const { user } = useAuth();

  console.log("user: ", user)
  return (
    <NavigationContainer independent={true}>
       { user ? <AppTabRoutes /> : <AuthRoutes /> }
    </NavigationContainer>
  )
}