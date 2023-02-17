import Loadable from "app/components/common/Loadable";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Feed = Loadable(lazy(() => import("./Feed")));

const feedRoutes: RouteObject[] = [
  {
    path: "/feed",
    element: <Feed />,
  },
];

export default feedRoutes;
