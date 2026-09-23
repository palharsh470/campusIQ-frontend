import { postMessage } from "../api/doubts"
import { useState } from "react"
import { useAlert } from "../../../context/AlertContext"

export function useReplyToDoubt() {

    const { showAlert } = useAlert()
    const [loading, setLoading] = useState(false)

    async function handleDoubtReply(doubtId, formData) {
        setLoading(true)
        try{
            await postMessage(doubtId, formData)
            return true
        }
        catch (err) {
            showAlert("error", err.response?.data?.detail || "Unable to send reply")
            return false
        } finally {
            setLoading(false)
        }
    }
    return {handleDoubtReply, loading}
}