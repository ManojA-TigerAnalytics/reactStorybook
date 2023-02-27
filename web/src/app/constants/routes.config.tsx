import AuthGuard from 'app/components/guards/AuthGuard'
import ReAuthGuard from 'app/components/guards/ReAuthGuard'
import AuthLayout from 'app/layouts/AuthLayout'
import Layout from 'app/layouts/Layout'
import authenticationRoutes from 'app/pages/authentication/authentication.routes'
import comparisonRoutes from 'app/pages/comparison/comparison.routes'
import dashboardRoutes from 'app/pages/dashboard/dashboard.routes'
import feedRoutes from 'app/pages/feed/feed.routes'
import plannerRoutes from 'app/pages/planner/planner.routes'
import recommenderRoutes from 'app/pages/recommender/recommender.routes'
import { Navigate, RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/login' />,
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
    children: [
      ...dashboardRoutes,
      ...comparisonRoutes,
      ...plannerRoutes,
      ...feedRoutes,
      ...recommenderRoutes,
    ],
  },
]

export default routes
