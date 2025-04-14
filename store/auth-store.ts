import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'manager';
  avatar?: string;
  lastLogin: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<AdminUser>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: true, // Set to true for demo purposes
      user: {
        id: 'admin-001',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop',
        lastLogin: new Date().toISOString(),
      },
      token: 'demo-token-12345',
      
      login: async (email: string, password: string) => {
        // In a real app, this would make an API call
        if (email && password) {
          set({
            isAuthenticated: true,
            user: {
              id: 'admin-001',
              name: 'Admin User',
              email,
              role: 'admin',
              avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop',
              lastLogin: new Date().toISOString(),
            },
            token: 'demo-token-12345',
          });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      },
      
      updateProfile: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);