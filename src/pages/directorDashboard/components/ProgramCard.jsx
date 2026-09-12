import { useState } from "react"
import EditProgramModal from "./EditProgramModal"

export const ProgramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="#00A63E" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 7h16M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m2 0v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
)

const ProgramCard = ({ program, handleDelete, isOwner, handleEdit }) => {

    const loading = false
    const [editModal, setEditModal] = useState(false)

    
    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col hover:-translate-y-1 hover:border-green-600/40 transition duration-300">
            <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-[#262626] flex items-center justify-center">
                    <ProgramIcon />
                </div>
                {program.duration_weeks && (
                    <span className="text-xs text-green-500 bg-green-600/10 border border-green-600/20 px-2.5 py-1 rounded-full">
                        {program.duration_weeks} weeks
                    </span>
                )}
            </div>

            <h3 className="text-base font-medium text-white">{program.title}</h3>
            <p className="text-sm text-white/50 mt-2 flex-1 line-clamp-3">
                {program.description || "No description added."}
            </p>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-800">
                <span className="text-xs text-zinc-600">
                    {new Date(program.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                {isOwner && <div className="flex items-center gap-1">
                    <button
                        onClick={()=>setEditModal(true)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-neutral-800 transition-colors"
                        title="Edit program"
                    >
                        <EditIcon />
                    </button>
                    <button
                        onClick={() => handleDelete(program.id)}
                        disabled={loading}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                        title="Delete program"
                    >
                        <TrashIcon />
                    </button>
                </div>}
            </div>

            <EditProgramModal program={program} isOpen={editModal} handleEdit={handleEdit} onClose={()=>setEditModal(false)} />
        </div>
    )
}

export default ProgramCard