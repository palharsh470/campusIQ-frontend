
const ClassFilter = ({ options, selected, onChange }) => {
    const items = [{ id: "all", label: "All classes" }, ...options]

    return (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by class">
            {items.map((item) => {
                const active = item.id === selected
                return (
                    <button
                        key={item.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onChange(item.id)}
                        className={`min-h-11 px-4 rounded-full border text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${
                            active
                                ? "bg-green-600 border-green-600 text-black font-medium"
                                : "border-neutral-700 text-white hover:bg-neutral-900"
                        }`}
                    >
                        {item.label}
                    </button>
                )
            })}
        </div>
    )
}

export default ClassFilter