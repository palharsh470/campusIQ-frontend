import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerOrg } from "../../../api/auth"
import { useAuth } from "../../../context/AuthContext"

export default function RegisterOrg() {
    const [form, setForm] = useState({ org_name: '', type: '', username: '', email: '', password: '' })
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const {user, logout} = useAuth()

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    async function handleRegistration(e) {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            const { data } = await registerOrg(form)
            navigate('/')
        }
        catch (err) {
            setError(err.message || 'Registration failed — check details and try again')
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
            <form onSubmit={handleRegistration} className="w-80 space-y-4 p-6 border rounded-lg">
                <h1 className="text-2xl font-bold">Register Organization</h1>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <input className="w-full border p-2 rounded" name="org_name" placeholder="College Name" onChange={handleChange} />
                <input className="w-full border p-2 rounded" name="type" placeholder="Organization Type" onChange={handleChange} />
                <input className="w-full border p-2 rounded" name="username" placeholder="Director Username" onChange={handleChange} />
                <input className="w-full border p-2 rounded" name="email" placeholder="Email" onChange={handleChange} />
                <input className="w-full border p-2 rounded" type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button className="w-full bg-black text-white p-2 rounded" type="submit">Register</button>
            </form>
        </div>
    )
}