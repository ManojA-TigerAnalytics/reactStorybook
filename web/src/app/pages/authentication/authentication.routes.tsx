import Loadable from "app/components/common/Loadable";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Login = Loadable(lazy(() => import("./login")));
type CustomRoutesObject = RouteObject & {
  auth: string;
};
const authenticationRoutes: CustomRoutesObject[] = [
  {
    path: "/login",
    element: <Login />,
    auth: "fef",
  },
];

export default authenticationRoutes;
