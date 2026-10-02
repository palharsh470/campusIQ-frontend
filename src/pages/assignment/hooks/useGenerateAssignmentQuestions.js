import { useState } from "react"
import { generateAssignmentQuestions } from "../api/assignment"
import { useAlert } from "../../../context/AlertContext"

export function useGenerateAssignmentQuestions() {
    const { showAlert } = useAlert()
    const [loading, setLoading] = useState(false)

    async function generate(lectureId, numQuestions = 5) {
        setLoading(true)
        try {
            const { data } = await generateAssignmentQuestions({ lecture: lectureId, num_questions: numQuestions })
            return data.questions
        } catch (err) {
            showAlert("error", err.response?.data?.detail || "Couldn't generate questions")
            return null
        } finally {
            setLoading(false)
        }
    }

    return { generate, loading }
}