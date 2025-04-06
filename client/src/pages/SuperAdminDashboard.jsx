"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Users, UserPlus, LogOut, Home, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import VotersList from "../components/VotersList"
import AddBoothHead from "../components/AddBoothHead"
import axios from "axios"

const SuperAdminDashboard = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="text-sm text-blue-200">Welcome, {currentUser?.username}</p>
        </div>
        <nav className="mt-8">
          <Link to="/super-admin" className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700">
            <Home className="w-5 h-5 mr-3" />
            Dashboard Home
          </Link>
          <Link to="/super-admin/voters" className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700">
            <Users className="w-5 h-5 mr-3" />
            Manage Voters
          </Link>
          <Link
            to="/super-admin/add-booth-head"
            className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700"
          >
            <UserPlus className="w-5 h-5 mr-3" />
            Add Booth Head
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 mt-8 text-blue-100 hover:bg-blue-700"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          </div>
        </header>

        <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/voters" element={<VotersList />} />
            <Route path="/add-booth-head" element={<AddBoothHead />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

// 🧠 Dynamic Dashboard Component
const DashboardHome = () => {
  const [stats, setStats] = useState(null)
  const [boothActivities, setBoothActivities] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/super-admin/dashboard-stats") // Update URL if deployed
        setStats(res.data.stats)
        setBoothActivities(res.data.boothActivities)
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      }
    }

    fetchStats()
  }, [])

  if (!stats) return <div>Loading dashboard...</div>

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-gray-600">Dashboard Overview</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <Card title="Total Voters" value={stats.totalVoters} color="gray" />
        <Card title="Verified Votes" value={stats.verifiedVotes} color="green" />
        <Card title="Rejected Votes" value={stats.rejectedVotes} color="red" />
        <Card title="Multiple Attempts" value={stats.multipleAttempts} color="yellow" />
        <Card title="Booth Heads" value={stats.boothHeads} color="blue" />
      </div>

      {/* Booth Agent Activity */}
      <div className="mt-10 bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Booth Agent Activity</h3>
        </div>
        <div className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {boothActivities.map((booth, idx) => (
            <div
              key={idx}
              className="rounded-lg shadow-lg bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="px-5 py-4 border-b bg-blue-100 rounded-t-lg">
                <h4 className="text-lg font-semibold text-blue-800">{booth.booth}</h4>
              </div>
              <div className="p-5 space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-600 w-5 h-5" />
                  <span className="font-medium">Verified Votes:</span>
                  <span className="ml-auto font-bold text-green-700">{booth.verified}</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="text-red-600 w-5 h-5" />
                  <span className="font-medium">Rejected Votes:</span>
                  <span className="ml-auto font-bold text-red-700">{booth.rejected}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-yellow-600 w-5 h-5" />
                  <span className="font-medium">Multiple Attempts:</span>
                  <span className="ml-auto font-bold text-yellow-700">{booth.multipleAttempts}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const Card = ({ title, value, color }) => {
  const colorMap = {
    gray: "text-gray-700",
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
    blue: "text-blue-600",
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-500">{title}</h3>
      <p className={`mt-2 text-3xl font-bold ${colorMap[color]}`}>{value}</p>
    </div>
  )
}

export default SuperAdminDashboard
