import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
} from 'react';

import api from '@/api';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshToken = useCallback(async () => {
    try {
      const response = await api.get('/api/v1/auth/refresh');
      setToken(response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      setToken(null);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get('/api/v1/auth/me');
        setToken(response.data.accessToken);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchMe();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newToken = await refreshToken();
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [token, refreshToken]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      user,
      refreshToken,
      isLoading,
    }),
    [token, user, refreshToken, isLoading],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
