import { useState } from "react"
import { Outlet, useNavigate, useOutletContext } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import { useDoubts } from "../hooks/useDoubt"
import DoubtCard from "../components/DoubtCard"
import AskDoubtModal from "../components/AskDoubtModal"
import EmptyState from "../components/EmptyState"
import ActivityIndicator from "../../../components/ActivityIndicator"
import {useDoubtSocket} from "../hooks/useDoubtSocket"

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" /><path d="m20 20-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
)
const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
)
const ChatIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 5.5C4 4.67 4.67 4 5.5 4H18.5C19.33 4 20 4.67 20 5.5V14.5C20 15.33 19.33 16 18.5 16H9L5 20V16H5.5C4.67 16 4 15.33 4 14.5V5.5Z" stroke="#71717a" strokeWidth="1.8" strokeLinejoin="round" /></svg>
)

const TABS = [{ key: "", label: "All" }, { key: "OPEN", label: "Open" }, { key: "RESOLVED", label: "Resolved" }]

const DoubtsLayout = () => {
    useDoubtSocket()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [tab, setTab] = useState("")
    const [search, setSearch] = useState("")
    const [isAskOpen, setIsAskOpen] = useState(false)
    const {classGroup} = useOutletContext()
    const { data: doubts, loading, error, refetch } = useDoubts({ status: tab, search, classGroup })

    return (
        <>
          
            <div className="bg-black min-h-screen flex flex-col md:flex-row">
                <div className="w-full md:w-95 md:border-r border-neutral-800 flex flex-col md:h-screen md:sticky md:top-0">
                    <div className="p-5 border-b border-neutral-800">
                        <p className="text-sm font-medium text-green-600 uppercase mb-1">Doubts</p>
                        <h1 className="text-2xl font-bold text-white mb-1">Ask, discuss & solve</h1>
                        <p className="text-xs text-zinc-500 mb-4">Doubts raised in your class</p>

                        <div className="relative mb-3">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search doubts, keywords..."
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-neutral-600"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"><SearchIcon /></div>
                        </div>

                        {user?.role === "STUDENT" && (
                            <button
                                onClick={() => setIsAskOpen(true)}
                                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                            >
                                <PlusIcon /> Ask a Doubt
                            </button>
                        )}

                        <div className="flex gap-1 mt-4 bg-neutral-900 border border-neutral-800 rounded-lg p-1">
                            {TABS.map((t) => (
                                <button
                                    key={t.key}
                                    onClick={() => setTab(t.key)}
                                    className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-colors ${tab === t.key ? "bg-green-600 text-white" : "text-zinc-500 hover:text-white"}`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {loading && <div className="flex justify-center py-10"><ActivityIndicator /></div>}
                        {error && <p className="text-red-500 text-sm p-5">{error}</p>}
                        {!loading && !error && doubts.length === 0 && (
                            <div className="p-5">
                                <EmptyState icon={<ChatIcon />} title="No doubts yet" description="Doubts raised in this class will show up here." />
                            </div>
                        )}
                        {!loading && doubts.map((d) => <DoubtCard key={d.id} doubt={d} />)}
                    </div>
                </div>

                <div className="flex-1 min-h-screen">
                    <Outlet context={{ refetchList: refetch }} />
                </div>
            </div>

            <AskDoubtModal
                isOpen={isAskOpen}
                onClose={() => setIsAskOpen(false)}
                onCreated={(created) => { refetch(); navigate(`${created.id}`) }}
            />
        </>
    )
}
export default DoubtsLayout