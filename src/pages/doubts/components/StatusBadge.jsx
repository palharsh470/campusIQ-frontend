const StatusBadge = ({ status }) => {
    if (status === "RESOLVED") {
        return (
            <span className="inline-flex items-center gap-1 text-[11px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Resolved
            </span>
        )
    }
    return (
        <span className="text-[11px] text-green-500 bg-green-600/10 border border-green-600/20 px-2 py-0.5 rounded-full">
            Open
        </span>
    )
}
export default StatusBadge