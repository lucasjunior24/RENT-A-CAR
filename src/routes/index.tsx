import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';
import { useAuth } from '../hooks/useAuth';
import { Load } from '../components/Load';

export function Routes() {
  const { user, isLoad } = useAuth();

  if(isLoad) {
    return <Load />
  }

  return (
    <NavigationContainer independent={true}>
       { user.id ? <AppTabRoutes /> : <AuthRoutes /> }
    </NavigationContainer>
  )
}