import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import ActivityIndicator from "../../../components/ActivityIndicator"
import { useRegister } from "../hooks/useRegister"

export default function RegisterOrg() {
    const {loading, handleRegistration} = useRegister()
    const [form, setForm] = useState({ org_name: '', type: '', username: '', email: '', password: '' })
    const { user } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    useEffect(() => {
        if (user) {
            navigate("/logout")
        }
    }, [])

    return (
        <div className="bg-black min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm border border-neutral-800 rounded-2xl p-8">
                <p className="text-sm font-medium text-green-600 uppercase mb-2">Get Started</p>
                <h1 className="text-2xl font-bold text-white mb-5.5">Register Organization</h1>

                <form onSubmit={(e)=>handleRegistration(e ,form)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">College Name</label>
                        <input
                            name="org_name"
                            placeholder="Enter college name"
                            onChange={handleChange}
                            className="bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">Organization Type</label>
                        <input
                            name="type"
                            placeholder="e.g. College, Institute"
                            onChange={handleChange}
                            className="bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">Director Username</label>
                        <input
                            name="username"
                            placeholder="Choose a username"
                            onChange={handleChange}
                            className="bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            onChange={handleChange}
                            className="bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white text-base py-3 flex justify-center rounded-lg transition-colors cursor-pointer mt-1"
                    >
                        {loading ? <ActivityIndicator size="sm" /> : 'Register'}
                    </button>
                </form>
                <p className="text-sm text-center text-zinc-500">
                    Already Exist?{' '}
                    <Link to="/org/login" className="text-green-600  hover:text-green-500 underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    )
}

