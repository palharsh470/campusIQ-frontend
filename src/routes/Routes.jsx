import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Login from "../pages/authentication/screen/Login.jsx"
import RegisterOrg from "../pages/authentication/screen/RegisterOrg.jsx"
import Logout from "../pages/authentication/screen/Logout.jsx"
import { teacherRoutes } from "../pages/teacherDashboard/routes/Routes.jsx";
import withSuspense from "./withSuspense.jsx";
import { studentRoutes } from "../pages/studentDashboard/routes/Routes.jsx";
import { directorRoutes } from "../pages/directorDashboard/routes/Routes.jsx";

const Programs = lazy(() => import("../pages/directorDashboard/screen/Programs.jsx"))

const Assignment = lazy(() => import("../pages/assignment/screen/Assignment.jsx"));

const Router = createBrowserRouter([
    { path: "/org/login", element: withSuspense(<Login/>) },
    { path: "/org/register", element: withSuspense(<RegisterOrg/>) },
    directorRoutes,
    teacherRoutes,
    studentRoutes,
    {
        path: "/programs",
        element: <Programs />
    },
    {
        path: "/logout",
        element: <Logout />,
    },
    {
        path: "*",
        element: <div>Page not found</div>,
    },
]);

export default Router;