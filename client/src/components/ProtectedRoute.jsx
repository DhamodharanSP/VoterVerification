"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (allowedRole && currentUser.role !== allowedRole) {
    // Redirect to appropriate dashboard based on role
    if (currentUser.role === "superadmin") {
      return <Navigate to="/super-admin" replace />
    } else if (currentUser.role === "boothhead") {
      return <Navigate to="/booth-head" replace />
    } else {
      return <Navigate to="/login" replace />
    }
  }

  return children
}

export default ProtectedRoute

