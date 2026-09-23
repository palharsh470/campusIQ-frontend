import { lazy } from "react"
import ProtectedRoute from "../../../components/ProtectedRoute.jsx"
import withSuspense from "../../../routes/withSuspense.jsx"

const DoubtsLayout = lazy(() => import("../screen/DoubtsLayout.jsx"))
const DoubtDetail = lazy(() => import("../screen/DoubtDetail.jsx"))
const DoubtsEmptyDetail = lazy(() => import("../screen/DoubtEmptyDetail.jsx"))

const doubtsRoutes = {
    path: "doubts",
    element: withSuspense(DoubtsLayout),
    children: [
        { index: true, element: withSuspense(DoubtsEmptyDetail) },
        { path: ":doubtId", element: withSuspense(DoubtDetail) },
    ],
}

export default doubtsRoutes