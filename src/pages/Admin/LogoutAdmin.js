import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LogoutAdmin = () => {
  const { logout } = useAuth();

  logout();

  return <Navigate to="/" />;
};

export default LogoutAdmin;
