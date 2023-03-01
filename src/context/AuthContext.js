import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../configs/api";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthData = {
  isAuth: false,
  user: null,
  token: null,
  error: null,
};

const AuthContext = createContext(AuthData);

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider(props) {
  const [authData, setAuthData] = useState(AuthData);
  const [userData, setUserData] = useLocalStorage("userData", null);

  useEffect(() => {
    if (userData) {
      setAuthData({
        isAuth: true,
        user: userData.user,
        token: userData.token,
        error: null,
      });
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { "Content-Type": "application/json" }
      );

      setUserData({
        user: response.data.data.user,
        token: response.data.data.token,
      });

      setAuthData({
        isAuth: true,
        user: response.data.data.user,
        token: response.data.data.token,
        error: null,
      });
    } catch (err) {
      if (err.response.status === 401) {
        setAuthData({
          ...authData,
          error: "Email atau password salah",
        });
      } else {
        setAuthData({
          ...authData,
          error: "Terjadi kesalahan",
        });
      }
    }
  };

  const logout = () => {
    setUserData(null);
    setAuthData(AuthData);
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }} {...props} />
  );
}

export { useAuth, AuthProvider, AuthContext };
