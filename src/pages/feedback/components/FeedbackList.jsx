import { CATEGORIES, classLabel, formatDate } from "../utils/feedbackStats"

const SHORT_LABELS = {
    subject_knowledge: "Subject",
    doubt_resolution: "Doubts",
    teaching_quality: "Teaching",
    practical_learning: "Practical",
}

const FeedbackList = ({ feedbacks }) => (
    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-3">
        <h2 className="text-base font-semibold text-white">Recent feedback</h2>

        {feedbacks.length === 0 ? (
            <p className="text-sm text-zinc-400 py-6 text-center">No feedback for this class yet.</p>
        ) : (
            <ul className="flex flex-col gap-3">
                {feedbacks.map((f) => (
                    <li
                        key={f.id}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-4 flex flex-wrap items-center gap-x-8 gap-y-3"
                    >
                        <div className="w-40">
                            <p className="text-sm font-semibold text-white">{classLabel(f.class_group)}</p>
                            <p className="text-xs text-zinc-400">{formatDate(f.created_at)}</p>
                        </div>

                        <dl className="flex gap-5">
                            {CATEGORIES.map((c) => (
                                <div key={c.key}>
                                    <dt className="text-xs text-zinc-400">{SHORT_LABELS[c.key]}</dt>
                                    <dd className={`text-base font-semibold ${f[c.key] <= 2 ? "text-orange-400" : "text-amber-400"}`}>
                                        {f[c.key]}
                                        <span className="sr-only"> out of 5</span>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        <div className="flex flex-col ">
                            
                        <p className="text-xs text-zinc-400">Comment</p>
                        <p className="flex-1 min-w-48 text-sm text-white">{f.comments || "No comment."}</p>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
)

export default FeedbackList