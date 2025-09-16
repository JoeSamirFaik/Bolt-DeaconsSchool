import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, usersAPI } from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Check for existing token and validate it
    const token = localStorage.getItem('deacons_token');
    if (token) {
      try {
        // Validate token by fetching user profile
        authAPI.getProfile()
          .then((response) => {
            setUser(response);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Token validation failed:', error);
            localStorage.removeItem('deacons_token');
            setLoading(false);
          });
      } catch (error) {
        console.error('Error validating token:', error);
        localStorage.removeItem('deacons_token');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {

      const response = await authAPI.login(email, password);
      
      // Store the JWT token
      localStorage.setItem('deacons_token', response.access_token);
      
      // Set user data
      setUser(response.user);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error instanceof Error ? error.message : 'فشل تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    setLoading(true);
    try {
      const response = await authAPI.register(userData);
      
      // Store the JWT token
      localStorage.setItem('deacons_token', response.access_token);
      
      // Set user data
      setUser(response.user);
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error instanceof Error ? error.message : 'فشل إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('deacons_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};