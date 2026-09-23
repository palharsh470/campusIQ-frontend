import { useState } from "react";
import { useAlert } from "../context/AlertContext";
import { useNavigate } from "react-router-dom";

export function usePost(fn){
    const {showAlert} = useAlert()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

       async function handlePost(e, form) {
                e.preventDefault()
                setLoading(true)
                try {
                    const { data } = await fn(form)
                    showAlert("success", `Data Added Successfully`)
                    navigate(-1)
                }
                catch (err) {
                    showAlert("error", err.message ||  'Something went wrong')
                }
                finally {
                    setLoading(false)
                }
            }
    
        return {
            loading, handlePost
        }
    
    }
