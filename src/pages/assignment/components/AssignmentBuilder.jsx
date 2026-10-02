import { useState } from "react"
import { useGenerateAssignmentQuestions } from "../hooks/useGenerateAssignmentQuestions"
import { useSaveAssignment } from "../hooks/useSaveAssignment"

const PlusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
)
const TrashIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m2 0v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const SparkleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Z" /></svg>
)

const emptyQuestion = () => ({
    text: "",
    options: [
        { text: "", is_correct: true },
        { text: "", is_correct: false },
        { text: "", is_correct: false },
        { text: "", is_correct: false },
    ],
})

const AssignmentBuilder = ({ lectureId, existingAssignment, onSaved, onCancel }) => {
    const [title, setTitle] = useState(existingAssignment?.title || "")
    const [questions, setQuestions] = useState(
        existingAssignment?.questions?.map((q) => ({
            text: q.text,
            options: q.options.map((o) => ({ text: o.text, is_correct: o.is_correct })),
        })) || [emptyQuestion()]
    )

    const { generate, loading: generating } = useGenerateAssignmentQuestions()
    const { save, loading: saving } = useSaveAssignment()

    const handleGenerate = async () => {
        const generated = await generate(lectureId, 5)
        if (generated) {
            setQuestions(generated.map((q) => ({
                text: q.text,
                options: q.options.map((o) => ({ text: o.text, is_correct: o.is_correct })),
            })))
        }
    }

    const updateQuestionText = (qIndex, text) =>
        setQuestions((prev) => prev.map((q, i) => (i === qIndex ? { ...q, text } : q)))

    const updateOptionText = (qIndex, oIndex, text) =>
        setQuestions((prev) =>
            prev.map((q, i) =>
                i === qIndex ? { ...q, options: q.options.map((o, j) => (j === oIndex ? { ...o, text } : o)) } : q
            )
        )

    const markCorrect = (qIndex, oIndex) =>
        setQuestions((prev) =>
            prev.map((q, i) =>
                i === qIndex ? { ...q, options: q.options.map((o, j) => ({ ...o, is_correct: j === oIndex })) } : q
            )
        )

    const addQuestion = () => setQuestions((prev) => [...prev, emptyQuestion()])
    const removeQuestion = (qIndex) => setQuestions((prev) => prev.filter((_, i) => i !== qIndex))

    const addOption = (qIndex) =>
        setQuestions((prev) =>
            prev.map((q, i) => (i === qIndex ? { ...q, options: [...q.options, { text: "", is_correct: false }] } : q))
        )

    const removeOption = (qIndex, oIndex) =>
        setQuestions((prev) =>
            prev.map((q, i) => (i === qIndex ? { ...q, options: q.options.filter((_, j) => j !== oIndex) } : q))
        )

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await save({ lecture: lectureId, title, questions }, existingAssignment?.id)
        if (result) onSaved(result)
    }

    return (
        <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <div className="flex items-center justify-between gap-3 mb-4">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Assignment title (e.g. Practice Set 1)"
                    required
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-neutral-600"
                />
                <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={generating}
                    className="flex items-center gap-1.5 text-sm bg-green-600/10 border border-green-600/30 text-green-400 hover:bg-green-600/20 disabled:opacity-60 px-3 py-2.5 rounded-lg transition-colors shrink-0"
                >
                    <SparkleIcon /> {generating ? "Generating..." : "Generate with AI"}
                </button>
            </div>

            <div className="flex flex-col gap-5">
                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="border border-neutral-800 rounded-xl p-4">
                        <div className="flex items-start gap-3 mb-3">
                            <span className="text-xs text-zinc-600 mt-2.5 shrink-0">Q{qIndex + 1}</span>
                            <input
                                value={q.text}
                                onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                                placeholder="Question text"
                                required
                                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-neutral-600"
                            />
                            {questions.length > 1 && (
                                <button type="button" onClick={() => removeQuestion(qIndex)} className="text-zinc-600 hover:text-red-500 mt-2">
                                    <TrashIcon />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 pl-7">
                            {q.options.map((o, oIndex) => (
                                <div key={oIndex} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name={`correct-${qIndex}`}
                                        checked={o.is_correct}
                                        onChange={() => markCorrect(qIndex, oIndex)}
                                        className="accent-green-600"
                                    />
                                    <input
                                        value={o.text}
                                        onChange={(e) => updateOptionText(qIndex, oIndex, e.target.value)}
                                        placeholder={`Option ${oIndex + 1}`}
                                        required
                                        className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-neutral-600"
                                    />
                                    {q.options.length > 2 && (
                                        <button type="button" onClick={() => removeOption(qIndex, oIndex)} className="text-zinc-700 hover:text-red-500">
                                            <TrashIcon />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={() => addOption(qIndex)} className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 mt-1">
                                <PlusIcon /> Add option
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between mt-5">
                <button type="button" onClick={addQuestion} className="text-sm text-zinc-400 hover:text-white flex items-center gap-1.5">
                    <PlusIcon /> Add question
                </button>
                <div className="flex gap-3">
                    {onCancel && (
                        <button type="button" onClick={onCancel} className="text-sm text-zinc-500 hover:text-white px-4 py-2">
                            Cancel
                        </button>
                    )}
                    <button type="submit" disabled={saving} className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm px-5 py-2.5 rounded-lg transition-colors">
                        {saving ? "Saving..." : "Save Assignment"}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AssignmentBuilder