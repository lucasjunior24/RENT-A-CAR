import { useContext } from 'react'

import { AuthContext } from '../hooks/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  console.log("user: ", context);
  return context;
}