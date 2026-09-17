import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Sidebar from "../components/Sidebar.jsx"
import { getEnrolledStudent } from "../api/enrollments.js";
import {useFetch} from "../../directorDashboard/hooks/useFetch.js"
import Badge from "../../../components/Badge.jsx";


const StudentDashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const {data : enrollment, loading , error} = useFetch(getEnrolledStudent, "getEnrolledStudent")
  const classGroup = enrollment[0]?.class_group

  return (
    <div className="bg-black h-screen flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-neutral-800 py-3 bg-black shrink-0 transition-all duration-300">
        <Link to="/teacher">
          <div className="text-white font-bold text-2xl">CampusIQ</div>
        </Link>
        <Badge heading={`${classGroup?.course} ${classGroup?.branch} ${classGroup?.year} year ${classGroup?.section}`} subheading={classGroup?.current_program_detail?.title}/>
        <div className="flex items-center gap-5 text-zinc-500">
          <p>Hi! {user.first_name} {user.last_name}</p>
          <button onClick={() => navigate("/logout")} className="border border-neutral-800 rounded-full text-sm px-4 py-1 text-zinc-300 hover:border-neutral-600 transition-colors">Logout</button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="flex h-full min-h-0">
            <Sidebar />

            <div className="flex-1 scrollbar-none overflow-y-auto">
                <section className='bg-black'>
                    <Outlet context={{enrollment : enrollment[0]}}/>
                </section>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default StudentDashboard;