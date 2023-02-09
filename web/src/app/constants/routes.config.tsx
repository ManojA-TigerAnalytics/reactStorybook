import authenticationRoutes from "app/pages/authentication/authentication.routes";
import dashboardRoutes from "app/pages/dashboard/dashboard.routes";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// const Login = lazy(() => import('./'))

const routes: RouteObject[] = [...authenticationRoutes, ...dashboardRoutes];

export default routes;
