
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { login as apiLogin, getStoredUser, storeUser, clearStoredUser } from '@/lib/auth';

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAdmin: boolean;
  isUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: { email: string; password?: string }) => {
    setIsLoading(true);
    const response = await apiLogin(credentials);
    if (response.user) {
      setUser(response.user);
      storeUser(response.user);
      setIsLoading(false);
      if (response.user.role === 'admin') {
        router.push('/admin/add-course');
      } else {
        router.push('/');
      }
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: response.error || 'Login failed' };
    }
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    clearStoredUser();
    router.push('/login');
  }, [router]);

  const isAuthenticated = !!user;
  const isAdmin = isAuthenticated && user?.role === 'admin';
  const isUser = isAuthenticated && user?.role === 'user';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, isAdmin, isUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
