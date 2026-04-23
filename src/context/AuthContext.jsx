import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import axiosInstance, { setUnauthorizedHandler } from "../api/axiosInstance";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearAuthState = useCallback(() => {
    setUser(null);
    setRole(null);
    setToken(null);
  }, []);

  const loadCurrentSession = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      const payload = response.data?.data;
      setUser(payload?.user || null);
      setRole(payload?.user?.role || null);
      setToken(payload?.token || null);
    } catch (_error) {
      clearAuthState();
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthState]);

  const login = useCallback(async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    const payload = response.data?.data;
    setUser(payload?.user || null);
    setRole(payload?.user?.role || null);
    setToken(payload?.token || null);
    return response.data;
  }, []);

  const register = useCallback(async (registrationData) => {
    const response = await axiosInstance.post("/auth/register", registrationData);
    const payload = response.data?.data;
    setUser(payload?.user || null);
    setRole(payload?.user?.role || null);
    setToken(payload?.token || null);
    return response.data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (_error) {
      // Session may already be invalid server-side.
    } finally {
      clearAuthState();
    }
  }, [clearAuthState]);

  useEffect(() => {
    setUnauthorizedHandler(clearAuthState);
    loadCurrentSession();

    return () => {
      setUnauthorizedHandler(null);
    };
  }, [clearAuthState, loadCurrentSession]);

  const contextValue = useMemo(
    () => ({
      user,
      role,
      token,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshSession: loadCurrentSession,
    }),
    [isLoading, loadCurrentSession, login, logout, register, role, token, user],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
