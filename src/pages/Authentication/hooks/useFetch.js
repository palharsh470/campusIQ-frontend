import { useState } from "react";
import { useNavigate } from "react-router-dom";       
import { useAuth } from "../../../context/AuthContext";
import { fetchMe, login, registerOrg } from "../../../api/auth";
import { useAlert } from "../../../context/AlertContext";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const { login : setAuth } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e, username, password) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await login({ username, password });
      localStorage.setItem("access_token", data.access);

      const { data: user } = await fetchMe();
      setAuth(user, data.access);
      showAlert("success", "Admin logged in successfully");

      if (user.role === "DIRECTOR") navigate("/director");
      else if (user.role === "TEACHER") navigate("/teacher");
      else navigate("/student");
    } catch (err) {
      showAlert("error", err.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  }

  return { loading, handleLogin };
}

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