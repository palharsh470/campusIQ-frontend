import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import doubtRoutes from "../pages/doubts/routes/routes.jsx";
import { teacherRoutes } from "../pages/teacherDashboard/routes/routes.jsx";
import withSuspense from "./withSuspense.jsx";
import doubtsRoutes from "../pages/doubts/routes/routes.jsx";

const Programs = lazy(() => import("../pages/directorDashboard/screen/Programs.jsx"))
const ClassGroups = lazy(() => import("../pages/directorDashboard/screen/ClassGroups.jsx"))
const RegisterTeacher = lazy(() => import("../pages/directorDashboard/screen/RegisterTeacher.jsx"));
const DirectorActions = lazy(() => import("../pages/directorDashboard/components/Actions.jsx"));
const Login = lazy(() => import("../pages/authentication/screen/Login.jsx"));
const RegisterOrg = lazy(() => import("../pages/authentication/screen/RegisterOrg.jsx"));
const DirectorDashboard = lazy(() => import("../pages/directorDashboard/screen/DirectorDashboard.jsx"));
const LaunchProgram = lazy(() => import("../pages/directorDashboard/screen/LaunchProgram.jsx"));
const AddClassGroups = lazy(() => import("../pages/directorDashboard/screen/AddClassGroups.jsx"));
const TeacherAssignment = lazy(() => import("../pages/directorDashboard/screen/TeacherAssignment.jsx"));
const StudentEnrollment = lazy(() => import("../pages/directorDashboard/screen/StudentEnrollment.jsx"));
const Logout = lazy(() => import("../pages/authentication/screen/Logout.jsx"));
const StudentDashboard = lazy(() => import("../pages/studentDashboard/screen/StudentDashboard.jsx"));
const StudentHome = lazy(() => import("../pages/studentDashboard/screen/Home.jsx"))
const StudentLectureRoom = lazy(() => import("../pages/studentDashboard/screen/Lecture.jsx"))
const LecturePreview = lazy(() => import("../pages/studentDashboard/screen/LecturePreview.jsx"))
const TeacherFeedback = lazy(() => import("../pages/studentDashboard/screen/Feedback.jsx"))
const Teachers = lazy(() => import("../pages/directorDashboard/screen/Teachers.jsx"))
const TeachersFeedbackPreview = lazy(() => import("../pages/directorDashboard/screen/TeacherFeedback.jsx"))



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
            { path: "", element: withSuspense(DirectorActions) },
            { path: "programs/new", element: withSuspense(LaunchProgram) },
            { path: "class-groups/new", element: withSuspense(AddClassGroups) },
            { path: "teacher-assignments/new", element: withSuspense(TeacherAssignment) },
            { path: "students/new", element: withSuspense(StudentEnrollment) },
            { path: "teachers/new", element: withSuspense(RegisterTeacher) },
            { path: "class-groups", element: withSuspense(ClassGroups) },
            { path: "teachers", element: withSuspense(Teachers) },
            { path: "teachers/:teacher/feedback", element: withSuspense(TeachersFeedbackPreview) },
            doubtRoutes
        ],
    },
    teacherRoutes,
    {
        path: "/student",
        element: <ProtectedRoute allowedRole="STUDENT">{withSuspense(StudentDashboard)}</ProtectedRoute>,
        children: [
            { path: "home", element: withSuspense(StudentHome) },
            { path: "lecture", element: withSuspense(StudentLectureRoom) },
            { path: "lecture/preview", element: withSuspense(LecturePreview) },
            { path: "feedback", element: withSuspense(TeacherFeedback) },
            doubtsRoutes

        ]
    },

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