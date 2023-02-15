import Loadable from "app/components/common/Loadable";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Dashboard = Loadable(lazy(() => import("./pages/Dashboard")));

const dashboardRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
];

export default dashboardRoutes;
