import Layout from "app/layouts/Layout";
import authenticationRoutes from "app/pages/authentication/authentication.routes";
import dashboardRoutes from "app/pages/dashboard/dashboard.routes";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  ...authenticationRoutes,
  {
    element: <Layout />,
    children: [...dashboardRoutes],
  },
];

export default routes;
