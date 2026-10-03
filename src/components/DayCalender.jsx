import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DayButton from "./DayButton.jsx"

const PAGE_SIZE = 30;
const pageOf = (day) => (day ? Math.floor((day - 1) / PAGE_SIZE) : 0)

const DayCalendar = ({ days, basePath, onSelect, selectedDay }) => {
    const [page, setPage] = useState(() => pageOf(selectedDay))

    useEffect(() => {
        setPage(pageOf(selectedDay))
    }, [selectedDay])

    const start = page * PAGE_SIZE
    const totalPages = Math.ceil(days?.length / PAGE_SIZE)
    const currentDays = days?.slice(start, start + PAGE_SIZE)

    return (
        <div className="h-75 w-80">
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
                {currentDays?.map((d) => {
                    const hasContent = d.lecture_count > 0
                    const clickable = d.is_unlocked
                    return (
                        <DayButton d={d} clickable={clickable} basePath={basePath} hasContent={hasContent} selectedDay={selectedDay} onSelect={onSelect}/>
                    )
                })}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                    <button
                        onClick={() =>
                            setPage((p) => Math.max(0, p - 1))
                        }
                        disabled={page === 0}
                        className="text-sm text-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white"
                    >
                        ← Previous
                    </button>

                    <span className="text-xs text-zinc-600">
                        Days {start + 1}–
                        {Math.min(
                            start + PAGE_SIZE,
                            days.length
                        )}{" "}
                        of {days.length}
                    </span>

                    <button
                        onClick={() =>
                            setPage((p) =>
                                Math.min(totalPages - 1, p + 1)
                            )
                        }
                        disabled={page === totalPages - 1}
                        className="text-sm text-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white"
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    )
}

export default DayCalendar