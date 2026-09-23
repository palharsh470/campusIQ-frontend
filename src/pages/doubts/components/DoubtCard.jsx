import { NavLink } from "react-router-dom"
import StatusBadge from "./StatusBadge"
import { timeAgo } from "../utils/timeAgo"

const DoubtCard = ({ doubt }) => (
    <NavLink
        to={`${doubt.id}`}
        className={({ isActive }) =>
            `block px-5 py-4 border-b border-neutral-900 transition-colors ${isActive ? "bg-neutral-900" : "hover:bg-neutral-900/50"}`
        }
    >
        <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#262626] border border-neutral-700 flex items-center justify-center text-xs text-zinc-300 shrink-0">
                {doubt.raised_by_name?.[0]?.toUpperCase() || "?"}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                    {doubt.topic_name && (
                        <span className="text-[11px] text-green-500 bg-green-600/10 border border-green-600/20 px-2 py-0.5 rounded-full">
                            {doubt.topic_name}
                        </span>
                    )}
                    <span className="text-[11px] text-zinc-600 shrink-0">{timeAgo(doubt.created_at)}</span>
                </div>
                <h3 className="text-sm font-medium text-white truncate">{doubt.title}</h3>
                <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">{doubt.question}</p>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-zinc-600">{doubt.reply_count} {doubt.reply_count === 1 ? "reply" : "replies"}</span>
                    <StatusBadge status={doubt.status} />
                </div>
            </div>
        </div>
    </NavLink>
)
export default DoubtCard