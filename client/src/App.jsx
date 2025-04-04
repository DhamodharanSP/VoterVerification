import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import SuperAdminDashboard from "./pages/SuperAdminDashboard"
import BoothHeadDashboard from "./pages/BoothHeadDashboard"
import VoterVerification from "./pages/VoterVerification"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/super-admin/*"
            element={
              <ProtectedRoute allowedRole="superadmin">
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booth-head/*"
            element={
              <ProtectedRoute allowedRole="boothhead">
                <BoothHeadDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify"
            element={
              <ProtectedRoute allowedRole="boothhead">
                <VoterVerification />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

