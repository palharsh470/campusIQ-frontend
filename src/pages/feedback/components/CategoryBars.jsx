
const CategoryBars = ({ averages, weakKeys = [] }) => (
    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-5">
        <h2 className="text-base font-semibold text-white">Average rating by category</h2>

        <ul className="flex flex-col gap-5">
            {averages.map((a) => {
                const weak = weakKeys.includes(a.key)
                return (
                    <li key={a.key} className="flex items-center gap-4">
                        <span className="w-36 shrink-0 text-sm text-white">{a.label}</span>
                        <div
                            className="flex-1 h-2.5 rounded-full bg-neutral-800"
                            role="meter"
                            aria-label={a.label}
                            aria-valuemin={0}
                            aria-valuemax={5}
                            aria-valuenow={Number(a.value.toFixed(1))}
                        >
                            <div
                                className={`h-full rounded-full ${weak ? "bg-orange-400" : "bg-amber-400"}`}
                                style={{ width: `${(a.value / 5) * 100}%` }}
                            />
                        </div>
                        <span className={`w-8 text-right text-sm font-semibold ${weak ? "text-orange-400" : "text-white"}`}>
                            {a.value.toFixed(1)}
                        </span>
                    </li>
                )
            })}
        </ul>

        {weakKeys.length > 0 && (
            <p className="text-sm text-zinc-400">
                Lowest rated: {averages.filter((a) => weakKeys.includes(a.key)).map((a) => a.label.toLowerCase()).join(", ")}.
            </p>
        )}
    </div>
)

export default CategoryBars