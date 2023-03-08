import React from "react";
import { createBrowserRouter, Link } from "react-router-dom";
import {
  AdminCandidates,
  AdminHome,
  AdminVoters,
  Login,
  LoginAdmin,
} from "./pages";
import LogoutAdmin from "./pages/Admin/LogoutAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello world</h1>
        <Link to="about">About us</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "admin/login",
    element: <LoginAdmin />,
  },
  {
    path: "admin/dashboard",
    element: <AdminHome />,
  },
  {
    path: "admin/candidates",
    element: <AdminCandidates />,
  },
  {
    path: "admin/voters",
    element: <AdminVoters />,
  },
  {
    path: "admin/logout",
    element: <LogoutAdmin />,
  },
]);

export default router;
