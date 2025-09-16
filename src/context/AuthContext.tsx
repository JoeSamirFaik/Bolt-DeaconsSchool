import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
    // Check for existing session
    const savedUser = localStorage.getItem('deacons_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('deacons_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock authentication - replace with actual API call
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'deacon@example.com',
          firstName: 'يوحنا',
          lastName: 'سمير',
          role: 'deacon',
          stage: 'ابتدائي',
          level: '1',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          email: 'servant@example.com',
          firstName: 'مريم',
          lastName: 'يوسف',
          role: 'servant',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          email: 'parent@example.com',
          firstName: 'داود',
          lastName: 'إبراهيم',
          role: 'parent',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
          parentInfo: {
            phone: '01234567890',
            address: 'القاهرة، مصر الجديدة',
            occupation: 'مهندس برمجيات',
            children: ['1'] // Child deacon ID
          }
        },
        {
          id: '4',
          email: 'admin@example.com',
          firstName: 'سارة',
          lastName: 'مينا',
          role: 'admin',
          createdAt: new Date().toISOString()
        }
      ];

      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser && password === 'password') {
        setUser(foundUser);
        localStorage.setItem('deacons_user', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    setLoading(true);
    try {
      const newUser: User = {
        ...userData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      localStorage.setItem('deacons_user', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('deacons_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};