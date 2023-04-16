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

export type AuthContextDataProps = { 
  user: UserDTO;
  // signIn: (credentials: SignInCredentials) => Promise<void>; 
  // signOut: () => void;
}

interface AuthContextProviderProps { 
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children } : AuthContextProviderProps) {
  return (
    <AuthContext.Provider value={{
      user: {
        id: '1',
        name: 'Lucas',
        email: "",
        driver_license: "",
        token: ''
      }
    }}>

      {children}
    </AuthContext.Provider>
  )
  // const [data, setData] = useState<AuthState>({} as AuthState);

  // async function signIn({ email, password} : SignInCredentials) {
  //     const response = await api.post('/sessions', {
  //       email,
  //       password
  //     });
        
  //     const { token, user } = response.data;
      
  //     api.defaults.headers.authorization = `Bearer ${token}`;

  //     setData({ token, user });
  // }

  // function signOut() {
  //   setData({} as AuthState);
  // }

  // async function UpdatedUser(user: UserDTO) {
    
  // }

  // return (
  //   <AuthContext.Provider 
  //     value={{
  //       user: data.user,
  //       signIn,
  //       signOut
  //     }}
  //   >
  //     {children}
  //   </ AuthContext.Provider>
  // )
}

function useAuth() : AuthContextDataProps {
  const context = useContext(AuthContext);
  return context;
}

