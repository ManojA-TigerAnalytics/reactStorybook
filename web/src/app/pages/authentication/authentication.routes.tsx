import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Login = lazy(() => import("./login/Login"));

const authenticationRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
];

export default authenticationRoutes;
