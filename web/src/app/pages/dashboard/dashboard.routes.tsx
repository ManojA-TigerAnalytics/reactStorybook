import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Dashboard = lazy(() => import("./pages/Dashboard"));

const dashboardRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
];

export default dashboardRoutes;
