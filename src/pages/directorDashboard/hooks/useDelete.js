import { useState } from "react";
import { useAlert } from "../../../context/AlertContext";

export function useDelete(fn) {
    const {showAlert} = useAlert()
    const [loading, setLoading] = useState(false)

    async function handleDelete(id) {

        setLoading(true)
        try {
            const { data } = await fn(id)
            showAlert("success", `Deleted Successfully` )
        }
        catch (err) {
            showAlert(err.response?.data?.detail || 'Unable to delete')
        }
        finally {
            setLoading(false)
        }
    }

    return {
       loading, handleDelete
    }

}
