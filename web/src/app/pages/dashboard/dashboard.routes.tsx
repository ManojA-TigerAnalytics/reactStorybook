import Loadable from "app/components/common/Loadable";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Dashboard = Loadable(lazy(() => import("./Dashboard")));

const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

export default dashboardRoutes;
