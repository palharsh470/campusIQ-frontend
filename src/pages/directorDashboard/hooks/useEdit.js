import { useState } from "react";
import { useAlert } from "../../../context/AlertContext";

export function useEdit(fn) {
    const {showAlert} = useAlert()
    const [loading, setLoading] = useState(false)

    async function handleEdit(id, form) {

        setLoading(true)
        try {
            const { data } = await fn(id, form)
            showAlert("success", ` Updated Successfully` )
        }
        catch (err) {
            showAlert(err.response?.data?.detail || 'Unable to Edit')
        }
        finally {
            setLoading(false)
        }
    }

    return {
       loading, handleEdit
    }

}
