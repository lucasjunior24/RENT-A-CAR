import React, {
  useState,
  createContext,
  useContext,
  ReactNode
} from 'react';

import api from '../services/api';
import { UserDTO } from '../dtos/UserDTO';
import { storageUserSave } from '../storage/storageUser';


interface AuthState {
  token: string;
  user: UserDTO;
}
interface SignInCredential {
  email: string;
  password: string;
}

export type AuthContextDataProps = { 
  user: UserDTO;
  // setUser: (user: UserDTO) => void
  signIn: (credentials: SignInCredential) => Promise<void>; 
  // signOut: () => void;
}

interface AuthContextProviderProps { 
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children } : AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )

  async function signIn({ email, password} : SignInCredential) {
      const response = await api.post('/sessions', {
        email,
        password
      });
        
      const { token, user } = response.data;
      console.log(token)
      
      api.defaults.headers.authorization = `Bearer ${token}`;
      
      setUser(user);
      storageUserSave(user)
  }

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

