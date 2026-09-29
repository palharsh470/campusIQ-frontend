import { lazy } from "react";
import ProtectedRoute from "../../../components/ProtectedRoute";
import withSuspense from "../../../routes/withSuspense.jsx";

const TeacherActions = lazy(() => import("../screen/Actions.jsx"))
const ClassGroupDashboard = lazy(() => import("../screen/ClassGroupDashboard.jsx"))
const Lecture = lazy(() => import("../../lectures/screen/Lecture.jsx"))
const TeacherHome = lazy(() => import("../screen/Home.jsx"))
const DoubtsLayout = lazy(() => import("../../doubts/screen/DoubtsLayout.jsx"))
const DoubtsEmptyDetail = lazy(() => import("../../doubts/screen/DoubtEmptyDetail.jsx"))
const DoubtDetail = lazy(() => import("../../doubts/screen/DoubtDetail.jsx"))
const TeacherDashboard = lazy(() => import("../screen/TeacherDashboard.jsx"))
const LecturePreview = lazy(() => import("../../lectures/screen/LecturePreview.jsx"))
const Announcement = lazy(() => import("../../announcement/screen/Announcement.jsx"))
const Assignment = lazy(() => import("../../assignment/screen/Assignment.jsx"))
const Attendance = lazy(() => import("../../attendance/screen/Attendance.jsx"))

export const teacherRoutes =
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
                { path: "lecture/preview", element: withSuspense(LecturePreview) },
                { path: "announcement", element: withSuspense(Announcement) },
                { path: "assignment", element: withSuspense(Assignment) },
                { path: "attendance", element: withSuspense(Attendance) },
                {
                    path: "doubts",
                    element: withSuspense(DoubtsLayout),
                    children: [
                        { index: true, element: withSuspense(DoubtsEmptyDetail) },
                        { path: ":doubtId", element: withSuspense(DoubtDetail) },
                    ]
                }
            ]
        },
    ]
}