import Loadable from "app/components/common/Loadable";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Recommender = Loadable(lazy(() => import("./Recommender")));

const recommenderRoutes: RouteObject[] = [
  {
    path: "/recommender",
    element: <Recommender />,
  },
];

export default recommenderRoutes;
