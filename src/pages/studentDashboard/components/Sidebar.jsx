import { Link, useNavigate, useLocation } from "react-router-dom"
import { ChatIcon, CopyIcon, FilesIcon, GridFourIcon, HouseSimpleIcon, ListBulletsIcon, PencilCircleIcon, PencilIcon, PencilLineIcon, PencilSimpleIcon, RecordIcon, VideoCameraIcon } from "@phosphor-icons/react"


const Sidebar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const path = pathname.split("/")[2]
    console.log(path)

    return (
        <div className="md:w-64 w-16 border-r border-neutral-800 text-base pt-4 flex flex-col shrink-0 h-full overflow-y-auto transition-all duration-300">
            <Link
                to="home"
                className={`flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                    ${path === "home"
                        ? "bg-green-600/10 border-green-600 text-green-500"
                        : "border-transparent hover:bg-neutral-900 text-zinc-500"
                    }`}
            >
                <HouseSimpleIcon size={25} />
                <p className="md:block hidden text-center">Home</p>
            </Link>

            <Link
                to="lecture"
                className={`flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                    ${path === "lecture"
                        ? "bg-green-600/10 border-green-600 text-green-500"
                        : "border-transparent hover:bg-neutral-900 text-zinc-500"
                    }`}
            >
                <VideoCameraIcon size={25} />
                <p className="md:block hidden text-center">Lecture</p>
            </Link>
            <Link
                to="/assignment"
                className={`flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                    ${path === "assignment"
                        ? "bg-green-600/10 border-green-600 text-green-500"
                        : "border-transparent hover:bg-neutral-900 text-zinc-500"
                    }`}
            >
                <ListBulletsIcon size={25} />
                <p className="md:block hidden text-center">Assignment</p>
            </Link>
            <Link
                to="/material"
                className={`flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                    ${path === "material"
                        ? "bg-green-600/10 border-green-600 text-green-500"
                        : "border-transparent hover:bg-neutral-900 text-zinc-500"
                    }`}
            >
                <FilesIcon size={25} />
                <p className="md:block hidden text-center">Program Material</p>
            </Link>
            <Link
                to="/doubts-room"
                className={`flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                    ${path === "doubt-room"
                        ? "bg-green-600/10 border-green-600 text-green-500"
                        : "border-transparent hover:bg-neutral-900 text-zinc-500"
                    }`}
            >
                <ChatIcon size={25} />
                <p className="md:block hidden text-center">Doubt Room</p>
            </Link>
            <Link
                to="feedback"
                className={`flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                    ${path === "feedback"
                        ? "bg-green-600/10 border-green-600 text-green-500"
                        : "border-transparent hover:bg-neutral-900 text-zinc-500"
                    }`}
            >
                <PencilSimpleIcon size={25} />
                <p className="md:block hidden text-center">Feedback</p>
            </Link>
        </div>
    )
}

export default Sidebar