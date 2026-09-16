import { Link, useNavigate, useLocation } from "react-router-dom"
import { ChatIcon, GridFourIcon } from "@phosphor-icons/react"


const Sidebar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    return (
        <div className="md:w-64 w-16 border-r border-neutral-800 text-base pt-4 flex flex-col shrink-0 h-full overflow-y-auto transition-all duration-300">
            <Link
                to="home"
                className={`flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                    ${pathname === "/home"
                        ? "bg-green-600/10 border-green-600 text-green-500"
                        : "border-transparent hover:bg-neutral-900 text-zinc-500"
                    }`}
            >
                <GridFourIcon size={25} />
                <p className="md:block hidden text-center">Home</p>
            </Link>

            <Link
                to="lecture"
                className={`flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                    ${pathname === "/lecture"
                        ? "bg-green-600/10 border-green-600 text-green-500"
                        : "border-transparent hover:bg-neutral-900 text-zinc-500"
                    }`}
            >
                <ChatIcon size={25} />
                <p className="md:block hidden text-center">Lecture</p>
            </Link>
            <Link
                to="/assignment"
                className={`flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                    ${pathname === "/assignment"
                        ? "bg-green-600/10 border-green-600 text-green-500"
                        : "border-transparent hover:bg-neutral-900 text-zinc-500"
                    }`}
            >
                <ChatIcon size={25} />
                <p className="md:block hidden text-center">Assignment</p>
            </Link>
            <Link
                to="/material"
                className={`flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                    ${pathname === "/material"
                        ? "bg-green-600/10 border-green-600 text-green-500"
                        : "border-transparent hover:bg-neutral-900 text-zinc-500"
                    }`}
            >
                <ChatIcon size={25} />
                <p className="md:block hidden text-center">Program Material</p>
            </Link>
            <Link
                to="/doubts-room"
                className={`flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                    ${pathname === "/doubt-room"
                        ? "bg-green-600/10 border-green-600 text-green-500"
                        : "border-transparent hover:bg-neutral-900 text-zinc-500"
                    }`}
            >
                <ChatIcon size={25} />
                <p className="md:block hidden text-center">Doubt Room</p>
            </Link>
            <Link
                to="/time-table"
                className={`flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                    ${pathname === "/time-table"
                        ? "bg-green-600/10 border-green-600 text-green-500"
                        : "border-transparent hover:bg-neutral-900 text-zinc-500"
                    }`}
            >
                <ChatIcon size={25} />
                <p className="md:block hidden text-center">Time Table</p>
            </Link>
        </div>
    )
}

export default Sidebar