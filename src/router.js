import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Login } from "./pages";

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
]);

export default router;
