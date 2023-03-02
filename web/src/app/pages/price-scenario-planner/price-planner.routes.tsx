import Loadable from 'app/components/common/Loadable'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const PricePlanner = Loadable(lazy(() => import('./PricePlanner')))

const pricePlannerRoutes: RouteObject[] = [
  {
    path: '/priceplanner',
    element: <PricePlanner />,
  },
]

export default pricePlannerRoutes
