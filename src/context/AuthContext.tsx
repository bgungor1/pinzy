

import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { getAccessToken, getRefreshToken, clearTokens, saveTokens } from '../utils/tokenManager';
import { authApi, usersApi, User } from '../services/api';


interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  refreshAccessToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTokensAndUser = async () => {
      try {
        const storedAccessToken = await getAccessToken();
        const storedRefreshToken = await getRefreshToken();

        if (storedAccessToken && storedRefreshToken) {
          setAccessToken(storedAccessToken);
          setRefreshToken(storedRefreshToken);

          try {
            const currentUser = await authApi.me(storedAccessToken);
            setUser(currentUser);
          } catch (error) {
            console.warn("Access token invalid or expired, attempting to refresh...");
            const refreshed = await refreshAccessTokenInternal(storedRefreshToken);
            if (!refreshed) {
              console.error("Failed to refresh token, logging out.");
              await logoutInternal();
            }
          }
        }
      } catch (error) {
        console.error('Error loading tokens:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTokensAndUser();
  }, []);
  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await authApi.login(username, password);
      await saveTokens(response.accessToken, response.refreshToken);
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (username: string, password: string, firstName: string, lastName: string) => {
      setLoading(true);
      try {
        const response = await authApi.register(username, password, firstName, lastName);
        await saveTokens(response.accessToken, response.refreshToken);
        setAccessToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        setUser(response.user);
      } finally {
        setLoading(false);
      }
    },
    []
  );


  const logoutInternal = useCallback(async () => {
    setLoading(true);
    try {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
      await clearTokens();
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  }, [refreshToken]);

  const logout = useCallback(async () => {
    await logoutInternal();
  }, [logoutInternal]);

  const refreshAccessTokenInternal = useCallback(async (currentRefreshToken: string | null): Promise<boolean> => {
    if (!currentRefreshToken) return false;
    setLoading(true);
    try {
      const response = await authApi.refreshToken(currentRefreshToken);
      await saveTokens(response.accessToken, response.refreshToken);
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      await logoutInternal();
      return false;
    } finally {
      setLoading(false);
    }
  }, [logoutInternal]);


  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    return refreshAccessTokenInternal(refreshToken);
  }, [refreshToken, refreshAccessTokenInternal]);

  const isAuthenticated = !!user && !!accessToken;

  const value = {
    user,
    accessToken,
    refreshToken,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};