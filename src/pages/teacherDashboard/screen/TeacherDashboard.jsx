import { useNavigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const TeacherDashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="bg-black h-screen flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-neutral-800 py-3 bg-black shrink-0 transition-all duration-300">
        <Link to="/teacher">
          <div className="text-white font-bold text-2xl">CampusIQ</div>
        </Link>
        <div className="flex items-center gap-5 text-zinc-500">
          <p>Hi! {user.first_name} {user.last_name}</p>
          <button onClick={() => navigate("/logout")} className="border border-neutral-800 rounded-full text-sm px-4 py-1 text-zinc-300 hover:border-neutral-600 transition-colors">Logout</button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherDashboard;