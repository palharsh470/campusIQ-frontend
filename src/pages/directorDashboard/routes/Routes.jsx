import { lazy } from "react";
import ProtectedRoute from "../../../components/ProtectedRoute";
import withSuspense from "../../../routes/withSuspense.jsx";
import doubtsRoutes from "../../doubts/routes/Routes.jsx";

const ClassGroups = lazy(() => import("../screen/ClassGroups.jsx"))
const RegisterTeacher = lazy(() => import("../screen/RegisterTeacher.jsx"));
const DirectorActions = lazy(() => import("../components/Actions.jsx"));
const DirectorDashboard = lazy(() => import("../screen/DirectorDashboard.jsx"));
const LaunchProgram = lazy(() => import("../screen/LaunchProgram.jsx"));
const AddClassGroups = lazy(() => import("../screen/AddClassGroups.jsx"));
const TeacherAssignment = lazy(() => import("../screen/TeacherAssignment.jsx"));
const StudentEnrollment = lazy(() => import("../screen/StudentEnrollment.jsx"));
const Teachers = lazy(() => import("../screen/Teachers.jsx"))
const TeachersFeedbackPreview = lazy(() => import("../screen/TeacherFeedback.jsx"))

export const directorRoutes = {
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
        doubtsRoutes
    ],
}