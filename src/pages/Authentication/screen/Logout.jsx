import { useAuth } from "../../../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Logout() {
    const {logout} = useAuth()
    const navigate = useNavigate()
    function handleLogout(){
        logout()
        navigate(-1)
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-96 p-8 bg-white border rounded-xl shadow-sm text-center">
        <h1 className="text-2xl font-bold mb-3">
          Logout
        </h1>

        <p className="text-gray-600 mb-6">
          Are you sure you want to logout?
        </p>

        <div className="flex gap-3">
          <button onClick={()=>navigate(-1)}
            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}