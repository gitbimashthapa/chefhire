
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/types';
import { login as loginService, register as registerService, logout as logoutService, getCurrentUser } from '@/backend/auth';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  register: (name: string, email: string, password: string) => Promise<User | null>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const loadUser = () => {
      try {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        // Clear potentially corrupted storage
        localStorage.removeItem('currentUser');
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const loggedInUser = loginService(email, password);
      if (loggedInUser) {
        setUser(loggedInUser);
        return loggedInUser;
      } else {
        toast.error('Invalid email or password');
        return null;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      return null;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<User | null> => {
    try {
      const newUser = registerService(name, email, password);
      if (newUser) {
        setUser(newUser);
        return newUser;
      } else {
        toast.error('Email already exists');
        return null;
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration');
      return null;
    }
  };

  const logout = () => {
    try {
      logoutService();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
