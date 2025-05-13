
'use client'; // To allow usage of localStorage if needed, though primarily server-logic or client-callable

import type { User } from '@/contexts/auth-context'; // Assuming User type will be defined in auth-context

// Hardcoded credentials - IN A REAL APP, USE A SECURE DATABASE AND HASH PASSWORDS
const ADMIN_CREDENTIALS = {
  email: 'admin@admin.com',
  password: 'admin123',
  role: 'admin' as 'admin' | 'user',
  id: 'admin001',
};

const USER_CREDENTIALS = {
  email: 'user@user.com',
  password: 'user123',
  role: 'user' as 'admin' | 'user',
  id: 'user001',
};

interface LoginInput {
  email: string;
  password?: string; // Password might not be needed if checking a stored session
}

interface LoginResponse {
  user?: User;
  error?: string;
}

export async function login(credentials: LoginInput): Promise<LoginResponse> {
  if (credentials.email === ADMIN_CREDENTIALS.email && credentials.password === ADMIN_CREDENTIALS.password) {
    return {
      user: {
        id: ADMIN_CREDENTIALS.id,
        email: ADMIN_CREDENTIALS.email,
        role: ADMIN_CREDENTIALS.role,
      },
    };
  }
  if (credentials.email === USER_CREDENTIALS.email && credentials.password === USER_CREDENTIALS.password) {
    return {
      user: {
        id: USER_CREDENTIALS.id,
        email: USER_CREDENTIALS.email,
        role: USER_CREDENTIALS.role,
      },
    };
  }
  return { error: 'Invalid email or password' };
}

const AUTH_STORAGE_KEY = 'learnify-auth-user';

export function getStoredUser(): User | null {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      try {
        return JSON.parse(storedUser) as User;
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
      }
    }
  }
  return null;
}

export function storeUser(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  }
}

export function clearStoredUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}
