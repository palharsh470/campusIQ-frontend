import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Sidebar from "../components/Sidebar.jsx"
import { getEnrolledStudent } from "../api/enrollments.js";
import Badge from "../../../components/Badge.jsx";
import { useFetch } from "../../../hooks/useFetch.js";
import NotificationBell from "../../notification/screen/NotificationBell.jsx";
import UserBadge from "../../../components/UserBadge.jsx";



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
        <NotificationBell/>
        <Badge heading={`${classGroup?.course} ${classGroup?.branch} ${classGroup?.year} year ${classGroup?.section}`} subheading={classGroup?.current_program_detail?.title}/>
        <UserBadge firstName={user.first_name} lastName={user.last_name}/>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="flex h-full min-h-0">
            <Sidebar />

            <div className="flex-1 scrollbar-none overflow-y-auto">
                <section className='bg-black'>
                    <Outlet context={{enrollment : enrollment[0], classGroup : enrollment[0]?.class_group}}/>
                </section>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default StudentDashboard;