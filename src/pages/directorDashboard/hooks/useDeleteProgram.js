import { useState } from "react";
import { deleteProgram } from "../api/programs";
import { useAlert } from "../../../context/AlertContext";

export function useDeleteProgram() {
    const {showAlert} = useAlert()
    const [loading, setLoading] = useState(false)

    async function handleDeleteProgram(id) {

        setLoading(true)
        try {
            const { data } = await deleteProgram(id)
            showAlert("success", `Program Deleted Successfully` )
        }
        catch (err) {
            showAlert(err.response?.data?.detail || 'Unable to delete Program')
        }
        finally {
            setLoading(false)
        }
    }

    return {
       loading, handleDeleteProgram
    }

}
