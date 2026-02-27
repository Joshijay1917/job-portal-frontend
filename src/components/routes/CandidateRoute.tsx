import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/auth.context"

export function CandidateRoute() {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />

  if (user.role !== "candidate") {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}