const AssignmentResult = ({ result, onRetake }) => (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center">
        <p className="text-4xl font-bold text-green-400">{result.score_percentage}%</p>
        <p className="text-sm text-zinc-500 mt-1">{result.correct_count} / {result.total_questions} correct</p>
        <button onClick={onRetake} className="mt-4 text-sm text-green-500 hover:text-green-400 border border-green-600/30 bg-green-600/10 px-4 py-2 rounded-lg transition-colors">
            Retake Assignment
        </button>
    </div>
)
export default AssignmentResult