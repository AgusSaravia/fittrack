import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [storageType, setStorageType] = useState(() =>
    localStorage.getItem("fitapp_remember") === "true"
      ? "localStorage"
      : "sessionStorage"
  );

  const getStorage = useCallback(() =>
    storageType === "localStorage" ? localStorage : sessionStorage
  );

  // Initialize state from the appropriate storage
  const [token, setToken] = useState(() => getStorage().getItem("token"));
  const [refreshToken, setRefreshToken] = useState(() =>
    getStorage().getItem("refreshToken")
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Simple logout that delegates to apiClient
  const logout = useCallback(async () => {
    try {
      if (refreshToken) {
        await apiClient.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear state
      setToken(null);
      setRefreshToken(null);
      setUser(null);

      // Clear storage
      apiClient.clearTokens();
      localStorage.removeItem("fitapp_remember");

      // Finish loading
      setLoading(false);
    }
  }, [refreshToken]);

  // Delegate refreshToken to apiClient
  const refreshAccessToken = useCallback(async () => {
    const success = await apiClient.refreshToken();
    if (success) {
      // Update local state with latest token
      setToken(apiClient.token);
    }
    return success;
  }, []);

  // Function to load user data using apiClient
  const loadUser = useCallback(async () => {
    try {
      const response = await apiClient.get("/user/me");

      if (!response.ok) {
        if (response.status === 401) {
          // apiClient already tried to refresh, so this is a hard auth failure
          setUser(null);
          return false;
        }
        throw new Error("Failed to load user data");
      }

      const userData = await response.json();
      setUser(userData);
      setError(null);
      return true;
    } catch (error) {
      console.error("Failed to load user data:", error);
      setUser(null);
      setError(error.message || "Failed to load user profile.");
      return false;
    }
  }, []);

  // Check session on mount
  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      if (!mounted) return;
      setLoading(true);

      try {
        // If we have a token, try to load user
        if (apiClient.token) {
          const success = await loadUser();
          if (success && mounted) {
            setToken(apiClient.token);
            setRefreshToken(apiClient.refreshToken);
          }
        }
        // If no token but has refresh token, try refresh
        else if (apiClient.refreshToken) {
          const refreshed = await refreshAccessToken();
          if (refreshed && mounted) {
            await loadUser();
          }
        }
      } catch (error) {
        console.error("Session check failed:", error);
        if (mounted) {
          setError("Session verification failed");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    return () => {
      mounted = false;
    };
  }, [loadUser, refreshAccessToken]);

  // Login function
  const login = async (loginData, rememberMe) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/auth/login", loginData);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // Update storage preference
      localStorage.setItem("fitapp_remember", rememberMe.toString());
      setStorageType(rememberMe ? "localStorage" : "sessionStorage");

      // Update apiClient tokens
      apiClient.setTokens(data.accessToken, data.refreshToken);

      // Update local state
      setToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setUser(data.user);
      setError(null);

      navigate("/workouts");
    } catch (loginError) {
      console.error("Login failed:", loginError);
      setError(loginError.message || "Login failed.");
      setUser(null);
      setToken(null);
      setRefreshToken(null);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (registerData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/auth/register", registerData);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      setError(null);
      navigate("/login");
      return { success: true, message: data.message };
    } catch (regError) {
      console.error("Registration failed:", regError);
      setError(regError.message || "Registration failed.");
      return {
        success: false,
        message: regError.message || "Registration failed.",
      };
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    user,
    token,
    refreshToken,
    loading,
    error,
    storageType,
    isAuthenticated: Boolean(token || refreshToken),
    login,
    logout,
    register,
    refreshAccessToken,
    clearError: () => setError(null),
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
