import Loadable from "app/components/common/Loadable";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import PromoConfiguration from "./PromoConfiguration";

const Recommender = Loadable(lazy(() => import("./Recommender")));

const recommenderRoutes: RouteObject[] = [
  {
    path: "/recommender",
    element: <Recommender />,
  },
  {
    path: "/recommender/configuration",
    element: <PromoConfiguration />,
  },
];

export default recommenderRoutes;
