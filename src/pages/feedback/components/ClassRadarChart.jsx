import {
    Legend,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts"


const SERIES_STYLES = [
    { color: "#fbbf24", dash: undefined },
    { color: "#38bdf8", dash: "6 4" },
    { color: "#c4b5fd", dash: "2 3" },
    { color: "#fb923c", dash: "10 3 2 3" },
]

const ClassRadarChart = ({ data, classes }) => (
    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-3">
        <h2 className="text-base font-semibold text-white">
            {classes.length > 1 ? "Class comparison" : "Rating profile"}
        </h2>

        <div role="img" aria-label="Radar chart of average ratings per category for each class">
            <ResponsiveContainer width="100%" height={320}>
                <RadarChart data={data} outerRadius="70%">
                    <PolarGrid stroke="#2a2a2a" />
                    <PolarAngleAxis dataKey="category" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                    <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
                    {classes.map((cls, i) => {
                        const style = SERIES_STYLES[i % SERIES_STYLES.length]
                        return (
                            <Radar
                                key={cls.id}
                                name={cls.label}
                                dataKey={`class_${cls.id}`}
                                stroke={style.color}
                                strokeWidth={2}
                                strokeDasharray={style.dash}
                                fill={style.color}
                                fillOpacity={0.12}
                            />
                        )
                    })}
                    <Tooltip
                        formatter={(value) => Number(value).toFixed(1)}
                        contentStyle={{ background: "#0a0a0a", border: "1px solid #262626", borderRadius: 8 }}
                        labelStyle={{ color: "#fff" }}
                    />
                    <Legend wrapperStyle={{ color: "#a1a1aa", fontSize: 13 }} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    </div>
)

export default ClassRadarChart