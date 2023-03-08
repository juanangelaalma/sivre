import React from "react";
import { createBrowserRouter, Link } from "react-router-dom";
import AdminMiddleware from "./middlewares/AdminMiddleware";
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
    element: <AdminMiddleware><AdminHome /></AdminMiddleware>,
  },
  {
    path: "admin/candidates",
    element: <AdminMiddleware><AdminCandidates /></AdminMiddleware>,
  },
  {
    path: "admin/voters",
    element: <AdminMiddleware><AdminVoters /></AdminMiddleware>,
  },
  {
    path: "admin/logout",
    element: <AdminMiddleware><LogoutAdmin /></AdminMiddleware>,
  },
]);

export default router;
