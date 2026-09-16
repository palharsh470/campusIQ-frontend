import { useMemo, useState } from 'react'
import { MagnifyingGlassIcon, UsersThreeIcon } from '@phosphor-icons/react'
import Modal from '../../../components/Modal'
import { ordinal } from '../utils/helperFunctions'

const getClassGroupLabel = (group) =>
    `${group.course} ${ordinal(group.year)} year ${group.branch} - ${group.section}`

const ClassGroupModal = ({ isOpen, onClose, onSelect, action = "Select a class", classGroups = [] }) => {
    const [search, setSearch] = useState('')

    const filteredGroups = useMemo(() => {
        if (!search.trim()) return classGroups
        const query = search.toLowerCase()
        return classGroups.filter((group) => {
            const label = getClassGroupLabel(group).toLowerCase()
            const programTitle = group.current_program_detail?.title?.toLowerCase() || ''
            return label.includes(query) || programTitle.includes(query)
        })
    }, [search, classGroups])

    const handleSelect = (group) => {
        onSelect(group)
        setSearch('')
        onClose()
    }

    const handleClose = () => {
        setSearch('')
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={action}>
            <div className="relative mb-4">
                <MagnifyingGlassIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                    type="text"
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search class or program..."
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-green-600 transition-colors"
                />
            </div>

            <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto -mr-2 pr-2">
                {filteredGroups.length > 0 ? (
                    filteredGroups.map((group) => (
                        <button
                            key={group.id}
                            onClick={() => handleSelect(group)}
                            className="w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg bg-neutral-800/50 hover:bg-green-600/10 border border-transparent hover:border-green-600/40 transition-colors text-left group"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-neutral-800 group-hover:bg-green-600/10 flex items-center justify-center shrink-0 transition-colors">
                                    <UsersThreeIcon size={18} className="text-zinc-400 group-hover:text-green-500 transition-colors" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm text-white font-medium truncate">{getClassGroupLabel(group)}</p>
                                    {group.current_program_detail ? (
                                        <p className="text-xs text-zinc-500 truncate">{group.current_program_detail.title}</p>
                                    ) : (
                                        <p className="text-xs text-zinc-600 italic">No program assigned</p>
                                    )}
                                </div>
                            </div>
                            {group.current_program_detail && (
                                <span className="text-xs text-green-500 bg-green-600/10 border border-green-600/20 px-2.5 py-1 rounded-full shrink-0">
                                    {group.current_program_detail.duration_weeks}w
                                </span>
                            )}
                        </button>
                    ))
                ) : (
                    <div className="py-10 text-center">
                        <p className="text-sm text-zinc-500">No classes found for "{search}"</p>
                    </div>
                )}
            </div>
        </Modal>
    )
}

export default ClassGroupModal