import { RouteObject } from 'react-router-dom'
import Login from './login/Login'

const authenticationRoutes: RouteObject[] = [
    {
        path: '/login',
        element: <Login />,
    },
]

export default authenticationRoutes
