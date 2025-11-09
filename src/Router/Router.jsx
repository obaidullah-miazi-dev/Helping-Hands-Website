import { createBrowserRouter } from "react-router"
import MainLayout from "../Layouts/MainLayout"
import Home from "../Pages/Home"
import Events from "../Pages/Events"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
export const router =createBrowserRouter([
    {
        path:'/',
        Component: MainLayout,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: '/events',
                Component: Events
            },
            {
                path:'/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    }
])


