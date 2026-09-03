import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Authentication/screen/Login.jsx";
import DirectorDashboard from './pages/DirectorDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentDashboard from './pages/StudentDashboard'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RegisterOrg from "./pages/Authentication/screen/RegisterOrg.jsx";
import Logout from "./pages/Authentication/screen/Logout.jsx";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register-org" element={<RegisterOrg/>} />
          <Route path="/director" element={<ProtectedRoute allowedRole="DIRECTOR"><DirectorDashboard/></ProtectedRoute>} />
          <Route path="/logout" element={<ProtectedRoute allowedRole="DIRECTOR"><Logout/></ProtectedRoute>} />
          <Route path="/teacher" element={<ProtectedRoute allowedRole="TEACHER"><TeacherDashboard/></ProtectedRoute>} />
          <Route path="/student" element={<ProtectedRoute allowedRole="STUDENT"><StudentDashboard/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

