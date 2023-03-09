import Loadable from 'app/components/common/Loadable'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Comparison = Loadable(lazy(() => import('./Comparison')))
const DetailedComparison = Loadable(
  lazy(() => import('./detailed-comparison/DetailedComparison'))
)
const comparisonRoutes: RouteObject[] = [
  {
    path: '/comparison',
    element: <Comparison />,
  },
  {
    path: '/comparison/details',
    element: <DetailedComparison />,
  },
]

export default comparisonRoutes
