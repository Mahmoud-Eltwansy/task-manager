import {createBrowserRouter} from "react-router-dom";
import Login from "./views/login.jsx";
import Register from "./views/register.jsx";
import DefaultLayout from "./Components/DefaultLayout.jsx";
import GuestLayout from "./Components/GuestLayout.jsx";
import Tasks from "./views/tasks.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            {
                path: "/tasks",
                element: <Tasks />
            },
            
        ],
    },
    {
        path: "/",
        element: <GuestLayout/>,
        children: [
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            }
        ],
    },



]);

export default router;