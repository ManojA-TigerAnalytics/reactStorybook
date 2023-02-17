import Loadable from "app/components/common/Loadable";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Planner = Loadable(lazy(() => import("./Planner")));

const plannerRoutes: RouteObject[] = [
  {
    path: "/planner",
    element: <Planner />,
  },
];

export default plannerRoutes;
