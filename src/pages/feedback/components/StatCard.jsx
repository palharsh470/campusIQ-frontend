import StarRating from "./StarRating"


const TONES = {
    default: "text-white",
    good: "text-green-400",
    warn: "text-orange-400",
}

const StatCard = ({ label, value, suffix, hint, stars, tone = "default" }) => (
    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-1">
        <p className="text-sm text-zinc-400">{label}</p>
        <p className={`text-4xl font-semibold ${TONES[tone]}`}>
            {value}
            {suffix && <span className="text-base font-normal text-zinc-400"> {suffix}</span>}
        </p>
        {stars !== undefined && <StarRating value={stars} />}
        {hint && <p className="text-sm text-zinc-400">{hint}</p>}
    </div>
)

export default StatCard