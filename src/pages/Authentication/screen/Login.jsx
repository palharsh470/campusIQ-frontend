import { useEffect, useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { login, fetchMe } from "../../../api/auth"

export default function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login: setAuth, user, logout } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  

  async function handleLogin(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const { data } = await login({ username, password })
      localStorage.setItem("access_token", data.access)

      const { data: user } = await fetchMe()
      setAuth(user, data.access)
      if (user.role === "DIRECTOR") navigate('/director')
        else if (user.role === "TEACHER") navigate('/teacher')
      else navigate('/STUDENT')
     
    }
    catch (err) {
      setError(err.message || "Invalid Username or Password")
    }
    finally {
      setLoading(false)
    }
  }

  
  useEffect(()=>{
    if(user){
      navigate("/logout")
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="w-80 space-y-4 p-6 border rounded-lg">
        <h1 className="text-2xl font-bold">Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input className="w-full border p-2 rounded" placeholder="Username"
          value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="w-full border p-2 rounded" type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-black text-white p-2 rounded" type="submit">Login</button>
        <p className="text-sm text-center">
          New org? <Link to="/register-org" className="underline">Register here</Link>
        </p>
      </form>
    </div>
  )
}
