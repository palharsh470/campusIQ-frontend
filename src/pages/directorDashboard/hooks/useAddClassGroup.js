import { useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import { useNavigate } from "react-router-dom";
import { addClassGroup } from "../api/classGroup";

export function useAddClassGroup(){
    const {showAlert} = useAlert()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

       async function handleAddClassGroup(e, form) {
                e.preventDefault()
                setLoading(true)
                try {
                    const { data } = await addClassGroup(form)
                    showAlert("success", "ClassGroup Added Successfully")
                    navigate('/director')
                }
                catch (err) {
                    showAlert("error", err.message ||  'Unable to add Class')
                }
                finally {
                    setLoading(false)
                }
            }
    
        return {
            loading, handleAddClassGroup
        }
    
    }
