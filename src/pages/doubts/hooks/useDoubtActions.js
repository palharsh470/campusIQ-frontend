import { useAlert } from "../../../context/AlertContext";
import { acceptMessage, toggleDoubtLike, toggleMessageLike } from "../api/doubts";


export function useDoubtActions() {
    const { showAlert } = useAlert()

    async function handleLikeDoubt(doubtId) {
        try { await toggleDoubtLike(doubtId) } catch (err) { console.log(err.message) }
    }
    async function handleLikeMessage(doubtId, messageId) {
        try { await toggleMessageLike(doubtId, messageId) } catch (err) { console.log(err.message) }
    }
    async function handleAccept(doubtId, messageId) {
        try {
            await acceptMessage(doubtId, messageId)
            showAlert("success", "Marked as the accepted answer")
        } catch (err) {
            showAlert("error", err.response?.data?.detail || "Unable to accept answer")
        }
    }

    return { handleLikeDoubt, handleLikeMessage, handleAccept}

}
