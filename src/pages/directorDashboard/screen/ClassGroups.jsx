import { Link, useNavigate } from "react-router-dom"
import { getClassGroup } from "../api/classGroup"
import { useFetch } from "../../../hooks/useFetch"

const PeopleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="8" r="3" stroke="#00A63E" strokeWidth="1.8" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="17" cy="8" r="2.4" stroke="#00A63E" strokeWidth="1.8" />
        <path d="M15.5 14.2c2.9.4 5 2.7 5 5.8" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
)

const TeacherAvatar = ({ name }) => {
    const initials = name
        ? name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
        : "?"
    return (
        <div className="w-9 h-9 rounded-full bg-[#262626] border border-neutral-700 flex items-center justify-center shrink-0">
            <span className="text-xs font-medium text-zinc-300">{initials}</span>
        </div>
    )
}

const ChevronIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m9 6 6 6-6 6" stroke="#71717a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const ClassGroups = () => {
    const navigate = useNavigate()
    const { data: classGroups, loading: listLoading, error, refetch } = useFetch(getClassGroup, "getClassGroups")

    return (
        <div className="bg-black min-h-screen px-4 py-16">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <div>
                        <p className="text-sm font-medium text-green-600 uppercase mb-2">Class Groups</p>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white"> Class Groups</h1>
                        <p className="text-sm text-zinc-500 mt-2">Every batch in your organization, with its teacher and active program.</p>
                    </div>
                    <Link
                        to="/director/class-groups/new"
                        className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-3 rounded-lg transition-colors shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
                        New Class Group
                    </Link>
                </div>

                <div className="flex flex-col gap-3">
                    {classGroups.map((cg) => (
                        <div
                            key={cg.id}
                            className="bg-neutral-900 border border-neutral-800 hover:border-green-600/40 rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 transition-colors"
                        >
                            <div className="flex items-center gap-3 sm:w-[30%]">
                                <div className="w-11 h-11 rounded-xl bg-[#262626] flex items-center justify-center shrink-0">
                                    <PeopleIcon />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{cg.course} — Year {cg.year}</p>
                                    <p className="text-xs text-zinc-500 mt-0.5">{cg.branch}, Section {cg.section}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 sm:w-[30%] sm:border-l sm:border-neutral-800 sm:pl-5">
                                {cg.assigned_teacher ? (
                                    <>
                                        <TeacherAvatar name={cg.assigned_teacher.name} />
                                        <div>
                                            <p className="text-[11px] text-zinc-600 uppercase">Teacher</p>
                                            <p className="text-sm text-zinc-200">{cg.assigned_teacher.name}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-9 h-9 rounded-full border border-dashed border-neutral-700 flex items-center justify-center shrink-0">
                                            <span className="text-zinc-600 text-sm">–</span>
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-zinc-600 uppercase">Teacher</p>
                                            <p className="text-sm text-zinc-500 italic">Not assigned</p>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex items-center sm:w-[28%] sm:border-l sm:border-neutral-800 sm:pl-5">
                                {cg.current_program_detail ? (
                                    <span className="text-xs text-green-500 bg-green-600/10 border border-green-600/20 px-3 py-1.5 rounded-full">
                                        {cg.current_program_detail.title}
                                    </span>
                                ) : (
                                    <span className="text-xs text-zinc-500 bg-neutral-800 border border-neutral-700 px-3 py-1.5 rounded-full">
                                        No active program
                                    </span>
                                )}
                            </div>

                            <div className="hidden sm:flex sm:w-[12%] justify-end">
                                <ChevronIcon />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default ClassGroups