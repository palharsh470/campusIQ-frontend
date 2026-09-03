import { useAuth } from "../../../context/AuthContext"

export default function Logout() {
    const {logout} = useAuth()

    function handleLogout(){
        logout()
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
          <button
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