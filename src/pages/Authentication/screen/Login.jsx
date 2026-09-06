import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ActivityIndicator from "../../../components/ActivityIndicator"
import { useLogin } from "../hooks/useFetch";
import { useAuth } from "../../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate()
  const { loading, handleLogin } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {user} = useAuth()

  useEffect(() => {
    if (user) {
      navigate("/logout")
    }
  }, [])


  return (

    <div className="bg-black min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-sm border border-neutral-800 rounded-2xl p-8">
        <p className="text-sm font-medium text-green-600 uppercase mb-2">Welcome Back</p>
        <h1 className="text-2xl font-bold text-white mb-5.5">Login</h1>

        <form onSubmit={(e) => handleLogin(e, username, password)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2.5">
            <label className="text-xs text-zinc-400">Username</label>
            <input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-xs text-zinc-400">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 flex justify-center  text-white text-base py-3 rounded-lg transition-colors cursor-pointer mt-1"
          >
            {loading ? <ActivityIndicator size="sm" /> : 'Login'}
          </button>

          <p className="text-sm text-center text-zinc-500">
            New org?{' '}
            <Link to="/org/register" className="text-green-600 hover:text-green-500 underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>

  )
}
