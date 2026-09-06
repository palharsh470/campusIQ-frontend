const ActivityIndicator = ({ size = 'md', fullScreen = false, label }) => {
    const sizes = {
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-10 h-10 border-[3px]',
    }

    const spinner = (
        <div
            className={`${sizes[size]} rounded-full border-neutral-700 border-t-green-600 animate-spin`}
        />
    )

    if (!fullScreen) return spinner

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-50">
            {spinner}
            {label && <p className="text-sm text-zinc-500">{label}</p>}
        </div>
    )
}

export default ActivityIndicator