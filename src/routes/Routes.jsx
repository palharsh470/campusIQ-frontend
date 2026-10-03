import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const Login = lazy(()=> import("../pages/Authentication/screen/Login.jsx"))
const RegisterOrg = lazy(()=> import("../pages/Authentication/screen/RegisterOrg.jsx"))
const Logout = lazy(()=>import("../pages/Authentication/screen/Logout.jsx"))
import { teacherRoutes } from "../pages/teacherDashboard/routes/routes.jsx";
import withSuspense from "./withSuspense.jsx";
import { studentRoutes } from "../pages/studentDashboard/routes/Routes.jsx";
import { directorRoutes } from "../pages/directorDashboard/routes/Routes.jsx";

const Programs = lazy(() => import("../pages/directorDashboard/screen/Programs.jsx"))

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