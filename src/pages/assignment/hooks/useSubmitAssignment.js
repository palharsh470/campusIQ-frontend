import { useState } from "react"
import { useAlert } from "../../../context/AlertContext"
import { submitAssignment } from "../api/assignment"

export function useSubmitAssignment() {
    const { showAlert } = useAlert()
    const [loading, setLoading] = useState(false)

    async function submit(assignmentId, answers) {
        setLoading(true)
        try {
            const { data } = await submitAssignment(assignmentId, { answers })
            return data
        } catch (err) {
            showAlert("error", err.response?.data?.detail || "Unable to submit")
            return null
        } finally {
            setLoading(false)
        }
    }

    return { submit, loading }
}