import React from "react";
import { createBrowserRouter, Link } from "react-router-dom";
import AdminMiddleware from "./middlewares/AdminMiddleware";
import VoterMiddleware from "./middlewares/VoterMiddleware";
import {
  AdminCandidates,
  AdminHome,
  AdminVoters,
  Home,
  Login,
  LoginAdmin,
  Results
} from "./pages";
import LogoutAdmin from "./pages/Admin/LogoutAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <VoterMiddleware>
        <Home />
      </VoterMiddleware>
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
    element: (
      <AdminMiddleware>
        <AdminHome />
      </AdminMiddleware>
    ),
  },
  {
    path: "admin/candidates",
    element: (
      <AdminMiddleware>
        <AdminCandidates />
      </AdminMiddleware>
    ),
  },
  {
    path: "admin/voters",
    element: (
      <AdminMiddleware>
        <AdminVoters />
      </AdminMiddleware>
    ),
  },
  {
    path: "admin/logout",
    element: (
      <AdminMiddleware>
        <LogoutAdmin />
      </AdminMiddleware>
    ),
  },
  {
    path: "results",
    element: <Results />
  }
]);

export default router;
