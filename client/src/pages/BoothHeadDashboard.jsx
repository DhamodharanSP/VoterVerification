"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Bell, LogOut, Home, CheckCircle, AlertTriangle } from "lucide-react"
import NotificationsList from "../components/NotificationsList"
import VoterVerification from "../components/VoterVerification"
const BoothHeadDashboard = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [notificationCount, setNotificationCount] = useState(0)

  useEffect(() => {
    // In a real app, fetch this data from your API
    setNotificationCount(5)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Booth Head</h2>
          <p className="text-sm text-green-200">Welcome, {currentUser?.username}</p>
        </div>
        <nav className="mt-8">
          <Link to="/booth-head" className="flex items-center px-4 py-3 text-green-100 hover:bg-green-700">
            <Home className="w-5 h-5 mr-3" />
            Dashboard Home
          </Link>
          <Link
            to="/booth-head/verifications"
            className="flex items-center px-4 py-3 text-green-100 hover:bg-green-700"
          >
            <Bell className="w-5 h-5 mr-3" />
            Verifications
            {notificationCount > 0 && (
              <span className="flex items-center justify-center w-6 h-6 ml-auto text-xs font-semibold text-white bg-red-500 rounded-full">
                {notificationCount}
              </span>
            )}
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 mt-8 text-green-100 hover:bg-green-700"
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
            <h1 className="text-3xl font-bold text-gray-900">Booth Head Dashboard</h1>
          </div>
        </header>

        <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<BoothDashboardHome />} />
            <Route path="/verifications" element={<VoterVerification />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

const BoothDashboardHome = () => {
  const [stats, setStats] = useState({
    totalVotersToday: 0,
    verifiedVoters: 0,
    rejectedVoters: 0,
    duplicateAttempts: 0,
  })

  useEffect(() => {
    // In a real app, fetch this data from your API
    setStats({
      totalVotersToday: 120,
      verifiedVoters: 115,
      rejectedVoters: 3,
      duplicateAttempts: 2,
    })
  }, [])

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-gray-500">Today's Statistics</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Total Voters Today</h3>
          <p className="mt-2 text-3xl font-bold text-blue-500">{stats.totalVotersToday}</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Verified Voters</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">{stats.verifiedVoters}</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Rejected Voters</h3>
          <p className="mt-2 text-3xl font-bold text-red-600">{stats.rejectedVoters}</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Duplicate Attempts</h3>
          <p className="mt-2 text-3xl font-bold text-yellow-600">{stats.duplicateAttempts}</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow text-gray-500">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">Recent Verifications</h3>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            <li className="flex items-center p-3 rounded-md bg-gray-50">
              <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
              <div>
                <p className="font-medium">Voter ID: ID45678 verified successfully</p>
                <span className="text-sm text-gray-500">10 minutes ago</span>
              </div>
            </li>
            <li className="flex items-center p-3 rounded-md bg-gray-50">
              <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
              <div>
                <p className="font-medium">Voter ID: ID56789 verified successfully</p>
                <span className="text-sm text-gray-500">25 minutes ago</span>
              </div>
            </li>
            <li className="flex items-center p-3 rounded-md bg-gray-50">
              <AlertTriangle className="w-5 h-5 mr-3 text-red-500" />
              <div>
                <p className="font-medium">Voter ID: ID67890 rejected - not in database</p>
                <span className="text-sm text-gray-500">45 minutes ago</span>
              </div>
            </li>
            <li className="flex items-center p-3 rounded-md bg-gray-50">
              <AlertTriangle className="w-5 h-5 mr-3 text-yellow-500" />
              <div>
                <p className="font-medium">Voter ID: ID23456 - duplicate voting attempt detected</p>
                <span className="text-sm text-gray-500">1 hour ago</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BoothHeadDashboard

