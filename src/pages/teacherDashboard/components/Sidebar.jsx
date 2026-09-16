import { Link, useNavigate, useLocation, replace } from "react-router-dom"
import { ChatIcon, GridFourIcon } from "@phosphor-icons/react"
import DropdownMenu from "./DropdownMenu"
import { useFetch } from "../../directorDashboard/hooks/useFetch"
import { getClassGroup } from "../../directorDashboard/api/classGroup"

const Sidebar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { data: classGroups } = useFetch(getClassGroup, "getClassGroups")

    return (
        <div className="md:w-64 w-16 border-r border-neutral-800 text-base pt-4 flex flex-col shrink-0 h-full overflow-y-auto transition-all duration-300">
            <button
               onClick={(e)=>{
                e.preventDefault()
                navigate(-1, {replace : true})}
            }
                className={`flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                    ${pathname === "/teacher"
                        ? "bg-green-600/10 border-green-600 text-green-500"
                        : "border-transparent hover:bg-neutral-900 text-zinc-500"
                    }`}
            >
                <GridFourIcon size={25} />
                <p className="md:block hidden text-center">Dashboard</p>
            </button>

            <DropdownMenu
                classGroups={classGroups}
                onSelect={(group) => navigate(`class-group/${group.id}/home` )}
            />

            <Link
                to="/chat"
                className={`flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                    ${pathname === "/chat"
                        ? "bg-green-600/10 border-green-600 text-green-500"
                        : "border-transparent hover:bg-neutral-900 text-zinc-500"
                    }`}
            >
                <ChatIcon size={25} />
                <p className="md:block hidden text-center">Chat</p>
            </Link>
        </div>
    )
}

export default Sidebar