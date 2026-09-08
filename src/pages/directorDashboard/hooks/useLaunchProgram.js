import { useState } from "react";
import { launchProgram } from "../api/programs";
import { useAlert } from "../../../context/AlertContext";
import { useNavigate } from "react-router-dom";

export function useLaunchProgram(){
    const {showAlert} = useAlert()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

       async function handleLaunchProgram(e, form) {
                e.preventDefault()
                setLoading(true)
                try {
                    const { data } = await launchProgram(form)
                    showAlert("success", `${data.title} Program Added Successfully`)
                    navigate('/director')
                }
                catch (err) {
                    showAlert("error", err.message ||  'Unable to Add Program')
                }
                finally {
                    setLoading(false)
                }
            }
    
        return {
            loading, handleLaunchProgram
        }
    
    }
