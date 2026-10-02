import { useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import AssignmentBuilder from "../components/AssignmentBuilder"
import AssignmentTaker from "../components/AssignmentTaker"
import AssignmentResult from "../components/AssignmentResult"
import ActivityIndicator from "../../../components/ActivityIndicator"
import { useLectureAssignment } from "../hooks/useLectureAssignment"
import { useLocation, useParams } from "react-router-dom"


const Assignment = () => {
    const { user } = useAuth()
    const {lectureId} = useParams()
    const { data: assignments, loading, refetch } = useLectureAssignment(lectureId)
    const [showBuilder, setShowBuilder] = useState(false)
    const [editing, setEditing] = useState(false)
    const [justSubmitted, setJustSubmitted] = useState(null)

    if (loading) return <div className="flex justify-center py-6"><ActivityIndicator /></div>
    if (assignments.length == 0 && user.role === "STUDENT") return <div className="flex justify-center text-white py-6">No Assignment Available</div>

    const assignment = assignments?.[0] ?? null  
    const isTeacher = user?.role === "TEACHER"

    if (showBuilder || editing) {
        return (
            <AssignmentBuilder
                lectureId={lectureId}
                existingAssignment={editing ? assignment : null}
                onSaved={() => { setShowBuilder(false); setEditing(false); refetch() }}
                onCancel={() => { setShowBuilder(false); setEditing(false) }}
            />
        )
    }

    if (!assignment) {
        if (!isTeacher) return null
        return (
            <button
                onClick={() => setShowBuilder(true)}
                className="text-sm text-zinc-400 hover:text-white border border-dashed border-neutral-800 hover:border-neutral-600 rounded-xl px-4 py-3 w-full text-center transition-colors"
            >
                + Add a practice assignment for this lecture
            </button>
        )
    }

    if (isTeacher) {
        return (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between">
                <div>
                    <p className="text-sm text-white font-medium">{assignment.title}</p>
                    <p className="text-xs text-zinc-500">{assignment.questions.length} questions</p>
                </div>
                <button onClick={() => setEditing(true)} className="text-sm text-green-500 hover:text-green-400">
                    Edit
                </button>
            </div>
        )
    }

    if (justSubmitted) {
        return <AssignmentResult result={justSubmitted} onRetake={() => setJustSubmitted(null)} />
    }
    return <AssignmentTaker assignment={assignment} onSubmitted={setJustSubmitted} />
}

export default Assignment