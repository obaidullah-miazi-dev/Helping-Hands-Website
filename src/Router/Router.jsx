import { createBrowserRouter } from "react-router"
import MainLayout from "../Layouts/MainLayout"
import Home from "../Pages/Home"
import Events from "../Pages/Events"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import UpcomingEvents from "../Pages/UpcomingEvents"
import EventDetails from "../components/EventDetails"
import JoinedEvents from "../Pages/JoinedEvents"
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
                path: '/upcomingEvents',
                Component: UpcomingEvents
            },
            {
                path:'/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/eventDetails/:id',
                Component: EventDetails
            },
            {
                path:'/joinedEvents',
                Component: JoinedEvents
            }
        ]
    }
])


