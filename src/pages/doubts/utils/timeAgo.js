export function timeAgo(dateString) {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000)
    const units = [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60]]
    for (const [label, secs] of units) {
        const count = Math.floor(seconds / secs)
        if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`
    }
    return "just now"
}