import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const Programs = lazy(()=>import("../pages/directorDashboard/screen/Programs.jsx"))
const RegisterTeacher = lazy(() => import("../pages/directorDashboard/screen/RegisterTeacher.jsx"));
const Actions = lazy(() => import("../pages/directorDashboard/components/Actions.jsx"));
const Login = lazy(() => import("../pages/authentication/screen/Login.jsx"));
const RegisterOrg = lazy(() => import("../pages/authentication/screen/RegisterOrg.jsx"));
const DirectorDashboard = lazy(() => import("../pages/DirectorDashboard/screen/DirectorDashboard.jsx"));
const LaunchProgram = lazy(() => import("../pages/directorDashboard/screen/LaunchProgram.jsx"));
const AddClassGroups = lazy(() => import("../pages/directorDashboard/screen/AddClassGroups.jsx"));
const TeacherAssignment = lazy(() => import("../pages/directorDashboard/screen/TeacherAssignment.jsx"));
const StudentEnrollment = lazy(() => import("../pages/directorDashboard/screen/StudentEnrollment.jsx"));
const Logout = lazy(() => import("../pages/authentication/screen/Logout.jsx"));
const TeacherDashboard = lazy(() => import("../pages/TeacherDashboard.jsx"));
const StudentDashboard = lazy(() => import("../pages/StudentDashboard.jsx"));


const withSuspense = (Component) => (
    <Suspense fallback={<div>Loading...</div>}>
        <Component />
    </Suspense>
);

const Router = createBrowserRouter([
    { path: "/org/login", element: withSuspense(Login) },
    { path: "/org/register", element: withSuspense(RegisterOrg) },

    {
        path: "/director",
        element: (
            <ProtectedRoute allowedRole="DIRECTOR">
                {withSuspense(DirectorDashboard)}
            </ProtectedRoute>
        ),
        children: [
            { path: "", element: withSuspense(Actions) },
            { path: "programs/new", element: withSuspense(LaunchProgram) },
            { path: "class-groups/new", element: withSuspense(AddClassGroups) },
            { path: "teacher-assignments/new", element: withSuspense(TeacherAssignment) },
            { path: "students/new", element: withSuspense(StudentEnrollment) },
            { path: "teachers/new", element: withSuspense(RegisterTeacher) },
        ],
    },

    {
        path: "/logout",
        element: <ProtectedRoute allowedRole="DIRECTOR">{withSuspense(Logout)}</ProtectedRoute>,
    },
    {
        path: "/teacher",
        element: <ProtectedRoute allowedRole="TEACHER">{withSuspense(TeacherDashboard)}</ProtectedRoute>,
    },
    {
        path: "/student",
        element: <ProtectedRoute allowedRole="STUDENT">{withSuspense(StudentDashboard)}</ProtectedRoute>,
    },
    {
        path: "/programs",
        element: <Programs/>
    },
    {
        path: "*",
        element: <div>Page not found</div>,
    },
]);

export default Router;