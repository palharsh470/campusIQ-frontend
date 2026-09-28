import { LockIcon } from "@phosphor-icons/react";
import { replace, useNavigate } from "react-router-dom";

export default function DayButton({ d, clickable, basePath, hasContent, isSelected }) {
    const navigate = useNavigate()
    return (

        <div className="relative group" key={d.day_number}>
            <button
                disabled={!clickable}
                onClick={() =>
                    navigate(`?day_number=${d.day_number}`, replace

                    )
                }
                className={`
            aspect-square w-full rounded-xl
            flex flex-col items-center justify-center
            border transition-all duration-300
            active:scale-95

            ${!clickable
                        ? "bg-neutral-950 border-neutral-900 text-zinc-700 cursor-not-allowed"
                        :
                        hasContent
                            ? "bg-green-600/10 border-green-600/40 text-green-400 hover:bg-green-600/20"
                            : "bg-neutral-900 border-neutral-800 text-zinc-400 hover:border-zinc-600"
                    }
        `}
            >
                {!clickable ? (
                    <LockIcon size={16} />
                ) : (
                    <div className="relative h-10 w-full overflow-hidden flex items-center justify-center px-1">
                        <span
                            className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-full"
                        >
                            <span className="text-sm font-medium">{d.day_number}</span>
                        </span>

                        <span
                            className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
                        >
                            <span className="text-[10px] font-medium leading-tight text-center px-0.5">
                                {hasContent
                                    ? `${d.lecture_count} ${d.lecture_count === 1 ? "Lec" : "Lecs"}`
                                    : "Empty"}
                            </span>
                        </span>
                    </div>

                )}
            </button>
        </div>

    );
};