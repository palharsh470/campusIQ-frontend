import { Link, useLocation, Navigate, useOutletContext } from "react-router-dom"
import { CalendarBlankIcon } from "@phosphor-icons/react"
import { actions } from "../utils/DashboardActions"
import { ordinal } from "../utils/helperFunctions"

export default function TeacherHome() {
   const { classGroup } = useOutletContext()
    

    if (!classGroup) {
        return <Navigate to="/teacher" replace />
    }

    const classLabel = `${classGroup.course} ${ordinal(classGroup.year)} year ${classGroup.branch}${classGroup.section ? ` - ${classGroup.section}` : ""}`
    const program = classGroup.current_program_detail

    return (
        <div className="px-4 py-16">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                <button className="bg-neutral-800 text-sm text-white/80 px-6 py-2.5 rounded-full">{classLabel}</button>

                <h1 className="text-white font-medium text-4xl md:text-[40px] mt-6">
                    Welcome to {classLabel}
                </h1>

                {program ? (
                    <>
                        <p className="text-base text-white/60 max-w-lg mt-2">
                            You're teaching <span className="text-white">{program.title}</span> to this class.
                        </p>
                        <div className="flex items-center gap-2 mt-4 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2">
                            <CalendarBlankIcon size={16} className="text-green-500" />
                            <p className="text-xs text-zinc-400">{program.duration_weeks} week program</p>
                        </div>
                        {program.description && (
                            <p className="text-sm text-white/50 max-w-lg mt-4">{program.description}</p>
                        )}
                    </>
                ) : (
                    <p className="text-base text-white/60 max-w-lg mt-2">
                        No program has been assigned to this class yet.
                    </p>
                )}

                <p className="text-sm text-zinc-500 mt-10 mb-4">What do you want to do with this class?</p>

            </div>
        </div>
    )
}