import { useState } from "react";
import { useNavigate } from "react-router-dom";       
import { useAuth } from "../../../context/AuthContext";
import { useAlert } from "../../../context/AlertContext";
import { fetchMe, login } from "../api/auth";



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
      localStorage.setItem("refresh_token", data.refresh);

      const { data: user } = await fetchMe();
      setAuth(user,  data.refresh, data.access);
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