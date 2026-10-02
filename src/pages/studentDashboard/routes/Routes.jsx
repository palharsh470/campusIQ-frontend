import { lazy } from "react";
import ProtectedRoute from "../../../components/ProtectedRoute";
import doubtsRoutes from "../../doubts/routes/routes.jsx";
import withSuspense from "../../../routes/withSuspense.jsx";

const StudentDashboard = lazy(() => import("../screen/StudentDashboard.jsx"));
const StudentHome = lazy(() => import("../screen/Home.jsx"))
const StudentLectureRoom = lazy(() => import("../../lectures/screen/Lecture.jsx"))
const LecturePreview = lazy(() => import("../../lectures/screen/LecturePreview.jsx"))
const TeacherFeedback = lazy(() => import("../screen/Feedback.jsx"))
const Assignment = lazy(() => import("../../assignment/screen/Assignment.jsx"))
const Attendance = lazy(() => import("../../attendance/screen/Attendance.jsx"))
const Material = lazy(() => import("../../material/screen/Material.jsx"))

export const studentRoutes = {
    path: "/student",
    element: <ProtectedRoute allowedRole="STUDENT">{withSuspense(StudentDashboard)}</ProtectedRoute>,
    children: [
        { index: true, element: withSuspense(StudentHome) },
        { path: "lecture", element: withSuspense(StudentLectureRoom) },
        { path: "lecture/:lectureId/preview", element: withSuspense(LecturePreview) },
        { path: "lecture/:lectureId/assignment", element: withSuspense(Assignment) },
        { path: "feedback", element: withSuspense(TeacherFeedback) },
        { path: "assignment", element: withSuspense(Assignment) },
        { path: "attendance", element: withSuspense(Attendance) },
        { path: "material", element: withSuspense(Material) },
        doubtsRoutes
    ]
}