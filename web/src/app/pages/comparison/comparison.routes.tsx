import Loadable from "app/components/common/Loadable";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Comparison = Loadable(lazy(() => import("./Comparison")));

const comparisonRoutes: RouteObject[] = [
  {
    path: "/comparison",
    element: <Comparison />,
  },
];

export default comparisonRoutes;
