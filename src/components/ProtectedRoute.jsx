import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, allowedRole, allowedRoles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/org/login" replace />
  const roles = allowedRoles || (allowedRole ? [allowedRole] : null)
  if (roles && !roles.includes(user.role)) return <Navigate to="/or/login" replace />
  return children 
}