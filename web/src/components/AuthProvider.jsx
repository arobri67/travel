import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
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
  const [token, setToken] = useState();
  const [user, setUser] = useState();

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
        const newToken = await refreshToken();
        if (newToken) {
          const response = await api.get('/api/v1/auth/me');
          setToken(response.data.accessToken);
          setUser(response.data.user);
        } else {
          setToken(null);
        }
      }
    };

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 403 && !originalRequest._retry) {
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
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
