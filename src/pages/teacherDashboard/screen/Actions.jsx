import { useState } from "react"
import ClassGroupModal from "../components/ClassgroupModal"
import Sidebar from "../components/Sidebar"
import { actions } from "../utils/DashboardActions"
import { useAlert } from "../../../context/AlertContext"
import { useNavigate } from "react-router-dom"
import { useFetch } from "../../directorDashboard/hooks/useFetch"
import { getClassGroup } from "../../directorDashboard/api/classGroup"

const Actions = () => {
    const { showAlert } = useAlert()
    const [activeAction, setActiveAction] = useState(null)
    const navigate = useNavigate()
    const { data: classGroups, loading: listLoading, error, refetch } = useFetch(getClassGroup, "getClassGroups")

    return (
        <div className="flex h-full min-h-0">
            <Sidebar />

            <div className="flex-1 overflow-y-auto">
                <section className='bg-black py-16 px-4'>
                    <div className='flex items-center flex-col justify-center text-center'>
                        <button className='bg-neutral-800 text-sm text-white/80 px-6 py-2.5 rounded-full'>Quick actions</button>
                        <h2 className='text-white font-medium text-4xl md:text-[40px] mt-6'>Everything you need, in one place.</h2>
                        <p className='text-base text-white/60 max-w-lg mt-2'>Jump straight into the things you do most as a teacher, without digging through menus.</p>

                        <div className='w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
                            {actions.map((action, index) => (
                                <button
                                    onClick={() => setActiveAction(action)}
                                    key={action.id ?? index}
                                    className='text-left bg-neutral-900 border border-neutral-800 rounded-2xl hover:-translate-y-3 hover:border-neutral-700 transition duration-300 p-6 flex flex-col'
                                >
                                    <div className='flex items-start justify-between'>
                                        <div className='w-14 h-14 rounded-xl bg-[#262626] flex items-center justify-center'>
                                            {action.icon}
                                        </div>
                                        {action.badge && (
                                            <div className='bg-[#262626] px-2.5 py-1 rounded-full h-fit'>
                                                <p className='text-xs text-white/80'>{action.badge}</p>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className='text-base font-medium text-white mt-8'>{action.title}</h3>
                                    <p className='text-sm text-white/50 mt-2 max-w-2xs mb-4'>{action.description}</p>
                                    <span className='mt-auto inline-flex items-center gap-1.5 text-sm text-[#00A63E] font-medium'>
                                        Open
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </button>
                            ))}
                        </div>

                        <ClassGroupModal
                            isOpen={!!activeAction}
                            onClose={() => setActiveAction(null)}
                            classGroups={classGroups}
                            action="Select ClassGroup"
                            onSelect={(group) => {
                                showAlert("success", `${group.course} ${group.branch} ${group.section} selected`)
                                navigate(`class-group/${group.id}/${activeAction?.path}`)
                                setActiveAction(null)
                            }}
                        />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Actions