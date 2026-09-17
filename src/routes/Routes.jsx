import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute.jsx";


const Programs = lazy(() => import("../pages/directorDashboard/screen/Programs.jsx"))
const ClassGroups = lazy(() => import("../pages/directorDashboard/screen/ClassGroups.jsx"))
const RegisterTeacher = lazy(() => import("../pages/directorDashboard/screen/RegisterTeacher.jsx"));
const DirectorActions = lazy(() => import("../pages/directorDashboard/components/Actions.jsx"));
const Login = lazy(() => import("../pages/authentication/screen/Login.jsx"));
const RegisterOrg = lazy(() => import("../pages/authentication/screen/RegisterOrg.jsx"));
const DirectorDashboard = lazy(() => import("../pages/DirectorDashboard/screen/DirectorDashboard.jsx"));
const LaunchProgram = lazy(() => import("../pages/directorDashboard/screen/LaunchProgram.jsx"));
const AddClassGroups = lazy(() => import("../pages/directorDashboard/screen/AddClassGroups.jsx"));
const TeacherAssignment = lazy(() => import("../pages/directorDashboard/screen/TeacherAssignment.jsx"));
const StudentEnrollment = lazy(() => import("../pages/directorDashboard/screen/StudentEnrollment.jsx"));
const Logout = lazy(() => import("../pages/authentication/screen/Logout.jsx"));
const TeacherDashboard = lazy(() => import("../pages/teacherDashboard/screen/TeacherDashboard.jsx"));
const StudentDashboard = lazy(() => import("../pages/studentDashboard/screen/StudentDashboard.jsx"));
const TeacherActions = lazy(() => import("../pages/teacherDashboard/screen/Actions.jsx"))
const ClassGroupDashboard = lazy(() => import("../pages/teacherDashboard/screen/ClassGroupDashboard.jsx"))
const Lecture = lazy(() => import("../pages/teacherDashboard/screen/Lecture.jsx"))
const TeacherHome = lazy(() => import("../pages/teacherDashboard/screen/Home.jsx"))
const StudentHome = lazy(() => import("../pages/studentDashboard/screen/Home.jsx"))
const StudentLectureRoom = lazy(() => import("../pages/studentDashboard/screen/Lecture.jsx"))
const LecturePreview = lazy(() => import("../pages/studentDashboard/screen/LecturePreview.jsx"))
const TeacherFeedback = lazy(() => import("../pages/studentDashboard/screen/Feedback.jsx"))


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
            { path: "", element: withSuspense(DirectorActions) },
            { path: "programs/new", element: withSuspense(LaunchProgram) },
            { path: "class-groups/new", element: withSuspense(AddClassGroups) },
            { path: "teacher-assignments/new", element: withSuspense(TeacherAssignment) },
            { path: "students/new", element: withSuspense(StudentEnrollment) },
            { path: "teachers/new", element: withSuspense(RegisterTeacher) },
            { path: "class-groups", element: withSuspense(ClassGroups) },
        ],
    },

    {
        path: "/logout",
        element: <Logout />,
    },
    {
        path: "/teacher",
        element: <ProtectedRoute allowedRole="TEACHER">{withSuspense(TeacherDashboard)}</ProtectedRoute>,
        children: [
            { path: "", element: withSuspense(TeacherActions) },
            {
                path: "class-group/:classId",
                element: withSuspense(ClassGroupDashboard),
                children: [
                    { path: "home", element: withSuspense(TeacherHome) },
                    { path: "lecture", element: withSuspense(Lecture) },
                ]
            },
        ]
    },

    {
        path: "/student",
        element: <ProtectedRoute allowedRole="STUDENT">{withSuspense(StudentDashboard)}</ProtectedRoute>,
        children: [
            { path: "home", element: withSuspense(StudentHome) },
            {path: "lecture", element: withSuspense(StudentLectureRoom)},
            { path: "lecture/preview", element: withSuspense(LecturePreview) },
            { path: "feedback", element: withSuspense(TeacherFeedback) }
        ]
    },
    {
        path: "/programs",
        element: <Programs />
    },
    {
        path: "*",
        element: <div>Page not found</div>,
    },
]);

export default Router;