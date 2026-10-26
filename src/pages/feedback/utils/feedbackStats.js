export const CATEGORIES = [
    { key: "subject_knowledge", label: "Subject knowledge" },
    { key: "doubt_resolution", label: "Doubt resolution" },
    { key: "teaching_quality", label: "Teaching quality" },
    { key: "practical_learning", label: "Practical learning" },
]

export const classLabel = (cg) => `${cg.branch} · Section ${cg.section}`

export const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })

export const average = (items, key) =>
    items?.length ? items.reduce((sum, f) => sum + f[key], 0) / items.length : 0

export const getCategoryAverages = (feedbacks) =>
    CATEGORIES.map((c) => ({ ...c, value: average(feedbacks, c.key) }))

export const getOverall = (averages) =>
    averages.length ? averages.reduce((sum, a) => sum + a.value, 0) / averages.length : 0

export function 
getInsights(averages) {
    const values = averages.map((a) => a.value)
    const max = Math.max(...values)
    const min = Math.min(...values)
    return {
        strongest: { value: max, items: averages.filter((a) => Math.abs(a.value - max) < 0.001) },
        weakest: { value: min, items: averages.filter((a) => Math.abs(a.value - min) < 0.001) },
    }
}

export function getClassOptions(feedbacks) {
    const seen = new Map()
    feedbacks?.forEach((f) => seen.set(f.class_group.id, { id: f.class_group.id, label: classLabel(f.class_group) }))
    return [...seen.values()].sort((a, b) => a.label.localeCompare(b.label))
}

export const getRadarData = (feedbacks, classes) =>
    CATEGORIES.map((c) => {
        const row = { category: c.label }
        classes.forEach((cls) => {
            row[`class_${cls.id}`] = average(
                feedbacks.filter((f) => f.class_group.id === cls.id),
                c.key
            )
        })
        return row
    })