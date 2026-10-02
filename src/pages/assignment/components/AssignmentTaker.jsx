import { useState } from "react"
import { useSubmitAssignment } from "../hooks/useSubmitAssignment"

const AssignmentTaker = ({ assignment, onSubmitted }) => {
    const [answers, setAnswers] = useState({})
    const { submit, loading } = useSubmitAssignment()

    const allAnswered = assignment.questions.every((q) => answers[q.id])

    const handleSelect = (questionId, optionId) =>
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = Object.entries(answers).map(([question, selected_option]) => ({
            question: Number(question),
            selected_option: Number(selected_option),
        }))
        const result = await submit(assignment.id, payload)
        if (result) onSubmitted(result)
    }

    return (
        <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <h3 className="text-white font-medium mb-4">{assignment.title}</h3>
            <div className="flex flex-col gap-5">
                {assignment.questions.map((q, i) => (
                    <div key={q.id}>
                        <p className="text-sm text-zinc-300 mb-2">{i + 1}. {q.text}</p>
                        <div className="flex flex-col gap-2 pl-4">
                            {q.options.map((o) => (
                                <label key={o.id} className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`question-${q.id}`}
                                        checked={answers[q.id] === o.id}
                                        onChange={() => handleSelect(q.id, o.id)}
                                        className="accent-green-600"
                                    />
                                    {o.text}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button
                type="submit"
                disabled={!allAnswered || loading}
                className="w-full mt-5 bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium py-3 rounded-lg transition-colors"
            >
                {loading ? "Submitting..." : "Submit Assignment"}
            </button>
        </form>
    )
}

export default AssignmentTaker