import Loadable from "app/components/common/Loadable";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Login = Loadable(lazy(() => import("./login/Login")));

const authenticationRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
];

export default authenticationRoutes;
