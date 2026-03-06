import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export function RecruiterRoute() {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />

  if (user.role !== "recruiter") {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}