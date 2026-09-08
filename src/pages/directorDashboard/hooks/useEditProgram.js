import { useState } from "react";
import { editProgram } from "../api/programs";
import { useAlert } from "../../../context/AlertContext";

export function useEditProgram() {
    const {showAlert} = useAlert()
    const [loading, setLoading] = useState(false)

    async function handleEditProgram(id, form) {

        setLoading(true)
        try {
            const { data } = await editProgram(id, form)
            showAlert("success", `Program Updated Successfully` )
        }
        catch (err) {
            showAlert(err.response?.data?.detail || 'Unable to Edit Program')
        }
        finally {
            setLoading(false)
        }
    }

    return {
       loading, handleEditProgram

    }

}
