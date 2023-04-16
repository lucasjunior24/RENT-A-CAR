import { useContext } from 'react'

import { AuthContext } from '../hooks/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}