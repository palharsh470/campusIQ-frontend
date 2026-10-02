import { useState } from "react"
import { createAssignment, updateAssignment } from "../api/assignment"
import { useAlert } from "../../../context/AlertContext"

export function useSaveAssignment() {
    const { showAlert } = useAlert()
    const [loading, setLoading] = useState(false)

    async function save(payload, existingId) {
        setLoading(true)
        try {
            const { data } = existingId
                ? await updateAssignment(existingId, payload)
                : await createAssignment(payload)
            showAlert("success", existingId ? "Assignment updated" : "Assignment created")
            return data
        } catch (err) {
            showAlert("error", err.response?.data?.detail || "Unable to save assignment")
            return null
        } finally {
            setLoading(false)
        }
    }

    return { save, loading }
}