import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import doubtRoutes from "../pages/doubts/routes/routes.jsx";
import { teacherRoutes } from "../pages/teacherDashboard/routes/routes.jsx";
import withSuspense from "./withSuspense.jsx";
import { studentRoutes } from "../pages/studentDashboard/routes/Routes.jsx";
import { directorRoutes } from "../pages/directorDashboard/routes/Routes.jsx";

const Programs = lazy(() => import("../pages/directorDashboard/screen/Programs.jsx"))
const RegisterOrg = lazy(() => import("../pages/authentication/screen/RegisterOrg.jsx"));
const Login = lazy(() => import("../pages/authentication/screen/Login.jsx"));
const Logout = lazy(() => import("../pages/authentication/screen/Logout.jsx"));
const Assignment = lazy(() => import("../pages/assignment/screen/Assignment.jsx"));




const Router = createBrowserRouter([
    { path: "/org/login", element: withSuspense(Login) },
    { path: "/org/register", element: withSuspense(RegisterOrg) },
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