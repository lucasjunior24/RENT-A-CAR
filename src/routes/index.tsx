import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
// import { useAuth } from '../hooks/auth';

import { useAuth } from '../hooks/auth';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';
import { AuthContext } from '../hooks/AuthContext';

export function Routes() {
  const { user } = useAuth();
  const contextData = useContext(AuthContext)
  console.log("user: ", contextData)
  return (
    <NavigationContainer independent={true}>
       { user ? <AppTabRoutes /> : <AuthRoutes /> }
    </NavigationContainer>
  )
}