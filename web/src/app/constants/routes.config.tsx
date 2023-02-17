import AuthGuard from "app/components/guards/AuthGuard";
import ReAuthGuard from "app/components/guards/ReAuthGuard";
import AuthLayout from "app/layouts/AuthLayout";
import Layout from "app/layouts/Layout";
import authenticationRoutes from "app/pages/authentication/authentication.routes";
import dashboardRoutes from "app/pages/dashboard/dashboard.routes";
import { Navigate, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    element: (
      <ReAuthGuard>
        <AuthLayout />
      </ReAuthGuard>
    ),
    children: authenticationRoutes,
  },
  {
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes],
  },
];

export default routes;
