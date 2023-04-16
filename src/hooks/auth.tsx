import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect
} from 'react';

import api from '../services/api';
import { UserDTO } from '../dtos/UserDTO';


interface AuthState {
  token: string;
  user: UserDTO;
}
interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData { 
  user: UserDTO;
  signIn: (credentials: SignInCredentials) => Promise<void>; 
  signOut: () => void;
}

interface AuthProviderProps { 
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children } : AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);

  async function signIn({ email, password} : SignInCredentials) {
      const response = await api.post('/sessions', {
        email,
        password
      });
        
      const { token, user } = response.data;
      
      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
  }

  function signOut() {
    setData({} as AuthState);
  }

  async function UpdatedUser(user: UserDTO) {
    
}

  return (
    <AuthContext.Provider 
      value={{
        user: data.user,
        signIn,
        signOut
      }}
    >
      {children}
    </ AuthContext.Provider>
  )
}

function useAuth() : AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };