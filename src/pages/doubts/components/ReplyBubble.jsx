import { timeAgo } from "../utils/timeAgo"

const HeartIcon = ({ filled }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20s-7-4.35-9.5-8.5C.5 8 2.5 4.5 6 4.5c2 0 3.5 1 4 2.5 1-1.5 2.5-2.5 4.5-2.5 3.5 0 5.5 3.5 3.5 7-2.5 4.15-9.5 8.5-9.5 8.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
)

const ReplyBubble = ({ message, canAccept, onLike, onAccept }) => (
    <div className={`flex gap-3 p-3 rounded-xl ${message.is_accepted ? "bg-green-600/10 border border-green-600/30" : ""}`}>
        <div className="w-8 h-8 rounded-full bg-[#262626] border border-neutral-700 flex items-center justify-center text-xs text-zinc-300 shrink-0">
            {message.sender_name?.[0]?.toUpperCase()}
        </div>
        <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-sm font-medium text-white">{message.sender_name}</span>
                <span className="text-[11px] text-zinc-500 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full">
                    {message.sender_role === "TEACHER" ? "Teacher" : "Student"}
                </span>
                {message.is_accepted && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-green-400 bg-green-600/15 border border-green-600/30 px-2 py-0.5 rounded-full">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        Verified Answer
                    </span>
                )}
                <span className="text-[11px] text-zinc-600">· {timeAgo(message.created_at)}</span>
            </div>
            <p className="text-sm text-zinc-300">{message.text}</p>
            {message.attachment && (
                <img src={message.attachment} alt="" className="mt-2 max-w-xs rounded-lg border border-neutral-800" />
            )}
            <div className="flex items-center gap-4 mt-2">
                <button onClick={onLike} className={`flex items-center gap-1.5 text-xs ${message.is_liked_by_me ? "text-green-500" : "text-zinc-500 hover:text-zinc-300"}`}>
                    <HeartIcon filled={message.is_liked_by_me} /> {message.like_count || 0}
                </button>
                {canAccept && !message.is_accepted && (
                    <button onClick={onAccept} className="text-xs text-zinc-500 hover:text-green-500">
                        Mark as Answer
                    </button>
                )}
            </div>
        </div>
    </div>
)
export default ReplyBubble