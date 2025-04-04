"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Users, UserPlus, LogOut, Home } from "lucide-react"
import VotersList from "../components/VotersList"
import AddBoothHead from "../components/AddBoothHead"

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

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalVoters: 0,
    verifiedVoters: 0,
    pendingVerifications: 0,
    boothHeads: 0,
  })

  useEffect(() => {
    // In a real app, fetch this data from your API
    setStats({
      totalVoters: 1250,
      verifiedVoters: 450,
      pendingVerifications: 15,
      boothHeads: 8,
    })
  }, [])

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-gray-500">Dashboard Overview</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Total Voters</h3>
          <p className="mt-2 text-3xl font-bold text-gray-500">{stats.totalVoters}</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Verified Voters</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">{stats.verifiedVoters}</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Pending Verifications</h3>
          <p className="mt-2 text-3xl font-bold text-yellow-600">{stats.pendingVerifications}</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Booth Heads</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.boothHeads}</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow text-gray-500">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">Recent Activity</h3>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            <li className="p-3 rounded-md bg-gray-50">
              <span className="text-sm text-gray-500">Today, 10:30 AM</span>
              <p>Booth Head "East District 1" verified 25 voters</p>
            </li>
            <li className="p-3 rounded-md bg-gray-50">
              <span className="text-sm text-gray-500">Today, 9:15 AM</span>
              <p>New Booth Head account created for "North District 3"</p>
            </li>
            <li className="p-3 rounded-md bg-gray-50">
              <span className="text-sm text-gray-500">Yesterday, 4:45 PM</span>
              <p>System detected and prevented 2 duplicate voting attempts</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminDashboard

