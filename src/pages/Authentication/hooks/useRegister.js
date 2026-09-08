import { useState } from "react";
import { useNavigate } from "react-router-dom";       
import { useAlert } from "../../../context/AlertContext";
import { registerOrg } from "../api/auth";

export function useRegister(){
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();
    const navigate = useNavigate();

     async function handleRegistration(e, form) {
            e.preventDefault()
            setLoading(true)
            try {
                const { data } = await registerOrg(form)
                showAlert("success", "Registered Successfully")
                navigate('/org/login')
            }
            catch (err) {
                showAlert("error", err.message || 'Registration failed — check details and try again')
            }
            finally {
                setLoading(false)
            }
        }

    return {
        loading, handleRegistration
    }

}