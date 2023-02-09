import authenticationRoutes from 'app/pages/authentication/authentication.routes'
import dashboardRoutes from 'app/pages/dashboard/dashboard.routes'
import { RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [...authenticationRoutes, ...dashboardRoutes]

export default routes
