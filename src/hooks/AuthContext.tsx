import React, {
  useState,
  createContext,
  useEffect,
  ReactNode
} from 'react';

import api from '../services/api';
import { UserDTO } from '../dtos/UserDTO';
import { storageUserSave, storageUserGet, storageUserRemove } from '../storage/storageUser';


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
  isLoad: boolean;
  signOut: () => Promise<void>;
}

interface AuthContextProviderProps { 
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children } : AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoad, setIsLoad] = useState(true);

  async function signIn({ email, password} : SignInCredential) {
      console.log(email, password)
      const response = await api.post('/sessions', {
        email,
        password
      });
        
      const { token, user } = response.data;
      console.log(user)
      
      api.defaults.headers.authorization = `Bearer ${token}`;
      
      setUser(user);
      await storageUserSave(user)
  }

  async function signOut() {
    try {
      setIsLoad(true)
      setUser({} as UserDTO)
      await storageUserRemove()
    }
    catch (error) {
      throw error;
    }
    finally {
      setIsLoad(false)
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet()

      if(userLogged) {
        console.log(userLogged)
        setUser(userLogged)
      }
    }
    catch (error) {
      throw error;
    }
    finally {
      setIsLoad(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn,
      isLoad,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

