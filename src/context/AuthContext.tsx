import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginUser } from 'src/services/user.service';

interface AuthContextType {
  user: string | null;
  role: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('userRole');
    if (savedUser && savedRole) {
      setUser(savedUser);
      setRole(savedRole);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const userData = await loginUser(username, password);

      if (userData) {
        setUser(userData.username);
        setRole(userData.role);
        localStorage.setItem('user', userData.username || '');
        localStorage.setItem('userRole', userData.role || '');
        localStorage.setItem('userId', userData.userId || '');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    setRole(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        login,
        logout,
        isAuthenticated: !!role,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
