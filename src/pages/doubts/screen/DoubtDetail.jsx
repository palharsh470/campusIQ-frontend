import { useState } from "react"
import { useParams, useOutletContext } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import { useDoubtDetail } from "../hooks/useDoubtDetail"
import { useReplyToDoubt } from "../hooks/useReplyToDoubt"
import { useDoubtActions } from "../hooks/useDoubtActions"
import StatusBadge from "../components/StatusBadge"
import ReplyBubble from "../components/ReplyBubble"
import ActivityIndicator from "../../../components/ActivityIndicator"
import { timeAgo } from "../utils/timeAgo"

const HeartIcon = ({ filled }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}><path d="M12 20s-7-4.35-9.5-8.5C.5 8 2.5 4.5 6 4.5c2 0 3.5 1 4 2.5 1-1.5 2.5-2.5 4.5-2.5 3.5 0 5.5 3.5 3.5 7-2.5 4.15-9.5 8.5-9.5 8.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
)
const ImageIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" /><circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="m21 15-5-5-9 9" stroke="currentColor" strokeWidth="1.8" /></svg>
)
const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
)

const DoubtDetail = () => {
    const { doubtId } = useParams()
    const { user } = useAuth()
    const { refetchList } = useOutletContext()
    const { data: doubt, loading, refetch } = useDoubtDetail(doubtId)

    const [replyText, setReplyText] = useState("")
    const [replyImage, setReplyImage] = useState(null)

    const { handleDoubtReply, loading: sending } = useReplyToDoubt()
    const { handleLikeDoubt, handleLikeMessage, handleAccept } = useDoubtActions()

    if (loading) return <div className="flex justify-center py-20"><ActivityIndicator /></div>
    if (!doubt) return null

    const canParticipate = user?.role === "STUDENT" || user?.role === "TEACHER"
   
    const onSend = async (e) => {
        e.preventDefault()
        if (!replyText.trim() && !replyImage) return
        const formData = new FormData()
        formData.append("text", replyText)
        if (replyImage) formData.append("attachment", replyImage)
        const replied = await handleDoubtReply(doubt.id, formData)
        if (replied) {
            setReplyText("")
            setReplyImage(null)
            refetch()
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="px-6 py-4 border-b border-neutral-800">
                <div className="flex items-start justify-between gap-4">
                    <h1 className="text-xl font-bold text-white">{doubt.title}</h1>
                    <StatusBadge status={doubt.status} />
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                    Asked in <span className="text-zinc-400">{doubt.class_group_label}</span>
                    {doubt.topic_name && <> · <span className="text-zinc-400">{doubt.topic_name}</span></>}
                    {doubt.lecture_title && <> · <span className="text-zinc-400">{doubt.lecture_title}</span></>}
                    {" · "}{timeAgo(doubt.created_at)}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
                <div className="flex gap-3 mb-6">
                    <div className="w-9 h-9 rounded-full bg-[#262626] border border-neutral-700 flex items-center justify-center text-sm text-zinc-300 shrink-0">
                        {doubt.raised_by_name?.[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-white">{doubt.raised_by_name}</span>
                            <span className="text-[11px] text-zinc-500 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full">Student</span>
                        </div>
                        <p className="text-sm text-zinc-300">{doubt.question}</p>
                        {doubt.attachment && (
                            <img src={doubt.attachment} alt="" className="mt-3 max-w-xs rounded-lg border border-neutral-800" />
                        )}
                        <div className="flex items-center gap-4 mt-3">
                            <button
                                onClick={async () => { await handleLikeDoubt(doubt.id); refetch() }}
                                className={`flex items-center gap-1.5 text-xs ${doubt.is_liked_by_me ? "text-green-500" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                <HeartIcon filled={doubt.is_liked_by_me} /> {doubt.like_count || 0}
                            </button>
                            <span className="text-xs text-zinc-600">{doubt.views_count} views</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-800 pt-5">
                    <p className="text-xs text-zinc-500 mb-4">
                        {doubt.messages.length} {doubt.messages.length === 1 ? "Reply" : "Replies"}
                    </p>
                    <div className="flex flex-col gap-4">
                        {doubt.messages.map((m) => (
                            <ReplyBubble
                                key={m.id}
                                message={m}
                                canAccept={canParticipate}
                                onLike={async () => { await handleLikeMessage(doubt.id, m.id); refetch() }}
                                onAccept={async () => { await handleAccept(doubt.id, m.id); refetch(); refetchList?.() }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {canParticipate ? (
                <form onSubmit={onSend} className="border-t border-neutral-800 px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#262626] border border-neutral-700 flex items-center justify-center text-xs text-zinc-300 shrink-0">
                        {(user.first_name?.[0] || user.username[0]).toUpperCase()}
                    </div>
                    <input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Add your reply..."
                        className="flex-1 bg-neutral-950 border border-neutral-800 rounded-full px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-neutral-600"
                    />
                    <label className="text-zinc-500 hover:text-white cursor-pointer">
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => setReplyImage(e.target.files[0])} />
                        {replyImage ? (
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700">
                                <img
                                    src={URL.createObjectURL(replyImage)}
                                    alt="Selected"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : <ImageIcon/>}
                    </label>
                    <button type="submit" disabled={sending} className="w-9 h-9 rounded-full bg-green-600 hover:bg-green-700 disabled:opacity-60 flex items-center justify-center text-white shrink-0">
                        <SendIcon />
                    </button>
                </form>
            ) : (
                <div className="border-t border-neutral-800 px-6 py-4 text-center text-xs text-zinc-600">
                    Directors have read-only access to doubts.
                </div>
            )}
        </div>
    )
}
export default DoubtDetail