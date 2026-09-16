import { ArrowLeftIcon } from "@phosphor-icons/react"
import { useNavigate, Outlet, NavLink, Navigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { actions } from "../utils/DashboardActions";
import { retriveClassGroup } from "../../directorDashboard/api/classGroup";
import ActivityIndicator from "../../../components/ActivityIndicator";
import Badge from "../../../components/Badge"
import { useRetrieve } from "../hooks/useRetrieve";

const ClassGroupDashboard = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const { classId } = useParams()
    const { data: classGroup, loading, error } = useRetrieve(retriveClassGroup, "retriveClassGroups", classId)

    if (loading) return <ActivityIndicator fullScreen />


    return (

        <div className="flex flex-1 min-h-0">
            <div className="md:w-64 w-16 border-r border-neutral-800 text-base pt-4 flex flex-col shrink-0 overflow-y-auto transition-all duration-300">

                <button
                    onClick={() => navigate("/teacher")}
                    className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white hover:bg-neutral-900 transition-colors"
                >
                    <ArrowLeftIcon size={22} className="shrink-0" />
                    <span className="md:block hidden text-sm">Change class</span>
                </button>


                <Badge heading={`${classGroup.course} ${classGroup.year} year ${classGroup.branch} ${classGroup.section}`} subheading={classGroup?.current_program_detail?.title} />


                {actions.map((action, index) => (
                    <NavLink
                        key={action.id ?? index}
                        to={action.path}
                        className={({ isActive }) => `flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                        ${false
                                ? "bg-green-600/10 border-green-600 text-green-500"
                                : "border-transparent hover:bg-neutral-900 text-zinc-500"
                            }`}
                    >
                        {action.icon}
                        <p className="md:block hidden text-center">{action.title}</p>
                    </NavLink>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto">
                <Outlet context={{ classGroup: classGroup }} />
            </div>
        </div >

    );
};

export default ClassGroupDashboard;